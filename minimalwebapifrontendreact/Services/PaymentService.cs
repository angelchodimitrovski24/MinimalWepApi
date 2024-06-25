using MinimalWebApi.Data;
using MinimalWebApi.Models;
using System.Threading.Tasks;

namespace MinimalWebApi.Services
{
    public class PaymentService
    {
        private readonly ApplicationDbContext _context;

        public PaymentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> MakePaymentAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}