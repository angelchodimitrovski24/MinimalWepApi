using Microsoft.AspNetCore.Mvc;
using MinimalWebApi.Services;
using MinimalWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MinimalWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;

        public TransactionsController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Transaction>>> GetTransactions()
        {
            var transactions = await _transactionService.GetTransactionsAsync();
            return Ok(transactions);
        }
    }
}
