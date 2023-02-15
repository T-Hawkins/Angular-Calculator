namespace Calculator.Models.Tables;

public class CalculatorHistory
{
    public Guid SchoolId { get; set; }
    public int UserId { get; set; }
    public string? Equation { get; set; }
    public decimal EquationValue { get; set; }
    public DateTime CreatedAt { get; set; }
}