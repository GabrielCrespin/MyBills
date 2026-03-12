using Microsoft.EntityFrameworkCore;
using FinanceApi.Models;

namespace FinanceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Bill> Bills { get; set; }
    }
}