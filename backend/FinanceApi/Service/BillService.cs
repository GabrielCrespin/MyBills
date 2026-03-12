using FinanceApi.Data;
using FinanceApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceApi.Services
{
    public class BillService
    {
        private readonly AppDbContext _context;

        public BillService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Bill>> GetAllAsync()
        {
            return await _context.Bills.ToListAsync();
        }

        public async Task<Bill?> GetByIdAsync(int id)
        {
            return await _context.Bills.FindAsync(id);
        }

        public async Task<Bill> CreateAsync(Bill bill)
        {
            _context.Bills.Add(bill);
            await _context.SaveChangesAsync();
            return bill;
        }

        public async Task<bool> UpdateAsync(Bill bill)
        {
            var exists = await _context.Bills.AnyAsync(b => b.Id == bill.Id);
            if (!exists) return false;

            _context.Entry(bill).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bill = await _context.Bills.FindAsync(id);
            if (bill == null) return false;

            _context.Bills.Remove(bill);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}