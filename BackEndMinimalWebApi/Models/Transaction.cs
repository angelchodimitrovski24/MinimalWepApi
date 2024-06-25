namespace MinimalWebApi.Models
{
    public class Transaction
    {
        public string TransactionId { get; set; }
        public string ProductId { get; set; }
        public string PaymentId { get; set; }
        public string Status { get; set; }

        public Product Product { get; set; }
        public Payment Payment { get; set; }
    }
}
