using Calculator.DataAccess;
using Calculator.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Calculator.Controllers;

[ApiController]
[Route("[controller]")]
public class Calculator : Controller
{
    private readonly CalculatorDataAccessor _dataAccessor;

    public Calculator(CalculatorDataAccessor dataAccessor)
    {
        _dataAccessor = dataAccessor;
    }
    
    // GET
    [HttpGet]
    // [Route("/equations/{userId}")]
    public IEnumerable<EquationDto> GetEquations()
    {
        var random = new Random();
        return Enumerable.Range(0, random.Next(10))
            .Select(x => new EquationDto
            {
                Id = x,
                Equation = $"{random.Next(100)} {GetOperator()} {random.Next(200)}"
            }).ToArray();

        string GetOperator()
            => (random.Next(3)) switch
            {
                3 => "*",
                2 => "/",
                1 => "+",
                0 => "-"
            };
    }
}