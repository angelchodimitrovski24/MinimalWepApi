using Microsoft.EntityFrameworkCore;
using MinimalWebApi.Models;
using System;

namespace MinimalWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for Products
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = "prod_1", Name = "Product 1", Price = 10.00m },
                new Product { ProductId = "prod_2", Name = "Product 2", Price = 20.00m },
                new Product { ProductId = "prod_3", Name = "Product 3", Price = 30.00m }
            );

            // Seed data for Payments
            modelBuilder.Entity<Payment>().HasData(
                new Payment { PaymentId = "pay_1", Amount = 10.00m, Currency = "USD", Status = "Paid" },
                new Payment { PaymentId = "pay_2", Amount = 20.00m, Currency = "USD", Status = "Paid" },
                new Payment { PaymentId = "pay_3", Amount = 30.00m, Currency = "USD", Status = "Paid" }
            );

            // Seed data for Transactions
            modelBuilder.Entity<Transaction>().HasData(
                new Transaction { TransactionId = "txn_1", ProductId = "prod_1", PaymentId = "pay_1", Status = "Completed" },
                new Transaction { TransactionId = "txn_2", ProductId = "prod_2", PaymentId = "pay_2", Status = "Completed" },
                new Transaction { TransactionId = "txn_3", ProductId = "prod_3", PaymentId = "pay_3", Status = "Completed" }
            );
        }
    }
}