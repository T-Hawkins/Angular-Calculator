using System.Data;
using Calculator.Dtos;
using Calculator.Models.Configuration;
using Calculator.Models.Tables;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Polly;

namespace Calculator.DataAccess;

public class CalculatorDataAccessor
{
    private readonly IOptions<CalculatorDataAccessOptions> _options;
    private readonly IDbConnection _dbConnection;

    public CalculatorDataAccessor(IOptions<CalculatorDataAccessOptions> options)
    {
        _options = options;
        _dbConnection = new SqlConnection(options.Value.ConnectionString);
    }

    /// <summary>
    /// Retrieve all equations for display for a given school/user combination
    /// </summary>
    /// <param name="schoolId"></param>
    /// <param name="userId"></param>
    /// <param name="cancellationToken">
    /// Dapper doesn't seem to support cancellation tokens but these should be used by default for all asynchronous
    /// programming to reduce issues with repetition if a transient failure is encountered and a retry is attempted
    /// </param>
    /// <returns></returns>
    public async Task<IEnumerable<EquationDto>> GetAsync(
        Guid schoolId,
        int userId,
        CancellationToken cancellationToken = default)
    {
        Task<IEnumerable<EquationDto>> Query() =>
            _dbConnection.QueryAsync<EquationDto>("""
            SELECT [Id], [Equation], [EquationValue] FROM [calc].[CalculatorHistory]
            WHERE [SchoolId] = @SchoolId 
                AND [UserId] = @UserId
            ORDER BY CreatedAt DESC
            """, new { SchoolId = schoolId, UserId = userId });

        var results = await ExecuteWithRetry<IEnumerable<EquationDto>>(Query);

        return results.ToArray();
    }

    public async Task AddAsync(CalculatorHistory @event)
    {
        Task<int> Query() =>
            _dbConnection.ExecuteAsync("""
            INSERT INTO [calc].[CalculatorHistory]
                (SchoolId, UserId, Equation, EquationResult),
            VALUES
                (@SchoolId, @UserId, @EquationId, @EquationResult)
            """, new { @event.SchoolId, @event.UserId, @event.Equation, @event.EquationResult });
        
        var result = await ExecuteWithRetry<int>(Query);

        if (result != 1)
        {
            throw new InvalidOperationException("Created more than one row with a singular insert query");
        }
    }

    private async Task<T> ExecuteWithRetry<T>(Func<Task<T>> func)
    {
        return await Policy
            .Handle<SqlException>()
            .Or<TimeoutException>()
            .WaitAndRetryAsync(
                _options.Value.MaximumConnectionRetries,
                r => TimeSpan.FromSeconds(Math.Pow(2, r)))
            .ExecuteAsync(func);
    }
}