namespace Calculator.Dtos;

public class EquationDto
{
    public int Id { get; set; }
    public int LocalId { get; set; }
    public string Equation { get; set; }
    public DateTime CreatedAt { get; set; }
}