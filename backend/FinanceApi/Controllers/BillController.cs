using Microsoft.AspNetCore.Mvc;
using FinanceApi.Models;
using FinanceApi.Services;

namespace FinanceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillsController : ControllerBase
    {
        private readonly BillService _service;

        public BillsController(BillService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bill>>> GetBills()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Bill>> GetBill(int id)
        {
            var bill = await _service.GetByIdAsync(id);
            if (bill == null) return NotFound();
            return Ok(bill);
        }

        [HttpPost]
        public async Task<ActionResult<Bill>> PostBill(Bill bill)
        {
            var created = await _service.CreateAsync(bill);
            return CreatedAtAction(nameof(GetBill), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBill(int id, Bill bill)
        {
            if (id != bill.Id) return BadRequest();

            var updated = await _service.UpdateAsync(bill);
            if (!updated) return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}