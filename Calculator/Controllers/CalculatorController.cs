using Calculator.DataAccess;
using Calculator.Dtos;
using Calculator.Models.Tables;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Controllers;

[ApiController]
[Route("[controller]")]
public class CalculatorController : Controller
{
    private readonly CalculatorDataAccessor _dataAccessor;

    public CalculatorController(CalculatorDataAccessor dataAccessor)
    {
        _dataAccessor = dataAccessor;
    }
    
    [HttpGet]
    public async Task<IEnumerable<EquationDto>> GetEquations([FromQuery]Guid schoolId, [FromQuery] int userId)
    {
        IEnumerable<EquationDto> items =  await _dataAccessor.GetAsync(schoolId, userId);
        items = items.OrderBy(x => x.CreatedAt).ToArray();
        var count = 0;
        foreach (var item in items)
        {
            item.LocalId = count++;
        }

        return items;
    }

    [HttpPost]
    public async Task AddEquation([FromBody]CalculatorHistory equation)
    {
         await _dataAccessor.AddAsync(equation);
    }
    
}