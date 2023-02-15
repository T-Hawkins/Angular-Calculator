namespace Calculator.Models.Configuration;

public class CalculatorDataAccessOptions
{
    public string ConnectionString { get; set; }
    public string Schema { get; set; }
    public string TableName { get; set; }
    public int MaximumConnectionRetries { get; set; } = 5; // Default
}