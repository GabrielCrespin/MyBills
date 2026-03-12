namespace FinanceApi.Models
{
    public class Bill
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Value { get; set; }
    }
}