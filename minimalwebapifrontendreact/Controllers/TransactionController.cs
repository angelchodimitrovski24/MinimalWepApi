using Microsoft.AspNetCore.Mvc;
using MinimalWebApi.Services;
using MinimalWebApi.Models;
using System.Threading.Tasks;

namespace MinimalWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ProductService _productService;
        private readonly PaymentService _paymentService;
        private readonly TransactionService _transactionService;

        public TransactionController(ProductService productService, PaymentService paymentService, TransactionService transactionService)
        {
            _productService = productService;
            _paymentService = paymentService;
            _transactionService = transactionService;
        }

        [HttpPost]
        public async Task<IActionResult> ProcessTransaction([FromBody] TransactionRequest request)
        {
            // Check if the product exists
            bool productExists = await _productService.CheckProductExistsAsync(request.ProductId);
            if (!productExists)
            {
                return NotFound("Product not found.");
            }

            // Make the payment
            var payment = new Payment
            {
                PaymentId = request.PaymentDetails.PaymentId,
                Amount = request.PaymentDetails.Amount,
                Currency = request.PaymentDetails.Currency,
                Status = "Paid"
            };

            bool paymentSuccess = await _paymentService.MakePaymentAsync(payment);
            if (!paymentSuccess)
            {
                return BadRequest("Payment failed.");
            }

            // Insert the transaction
            var transaction = new Transaction
            {
                TransactionId = request.TransactionDetails.TransactionId,
                ProductId = request.ProductId,
                PaymentId = payment.PaymentId,
                Status = "Completed"
            };

            bool transactionSuccess = await _transactionService.InsertTransactionAsync(transaction);
            if (!transactionSuccess)
            {
                return StatusCode(500, "Failed to insert transaction.");
            }

            return Ok("Transaction processed successfully.");
        }
    }

    public class TransactionRequest
    {
        public string ProductId { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public TransactionDetails TransactionDetails { get; set; }
    }

    public class PaymentDetails
    {
        public string PaymentId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
    }

    public class TransactionDetails
    {
        public string TransactionId { get; set; }
        public string Status { get; set; }
    }
}