namespace CodeReviewApi.Controllers;

public class test
{
    
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Email { get; set; }
    public bool IsActive { get; set; }
     
     public int GetAge()
     {
         var today = DateTime.Today;
         var age = today.Year - DateOfBirth.Year;
         if (DateOfBirth.Date > today.AddYears(-age)) age--;
         return age;
     }
    
    public override string ToString()
    {
        return $"{FirstName} {LastName} ({Email})";
    }
    
}