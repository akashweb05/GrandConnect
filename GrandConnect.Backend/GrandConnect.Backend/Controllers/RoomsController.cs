using GrandConnect.Backend.Data;
using GrandConnect.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace GrandConnect.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ILogger<RoomsController> _logger;

        public RoomsController(AppDbContext db, ILogger<RoomsController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var rooms = await _db.Rooms.OrderByDescending(r => r.CreatedAt).ToListAsync();
            return Ok(rooms);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug)
        {
            var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Slug == slug);
            if (room == null) return NotFound();
            return Ok(room);
        }

        public class CreateRoomDto
        {
            public string Name { get; set; } = null!;
            public string? Description { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name required");

            // create a safe slug
            string slugBase = Regex.Replace(dto.Name.ToLowerInvariant(), @"[^a-z0-9\-]+", "-").Trim('-');
            slugBase = slugBase.Length > 0 ? slugBase : "room";
            string slug = $"{slugBase}-{Guid.NewGuid().ToString().Substring(0, 8)}";

            var room = new Room
            {
                Name = dto.Name.Trim(),
                Description = dto.Description,
                Slug = slug
            };

            _db.Rooms.Add(room);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBySlug), new { slug = room.Slug }, room);
        }
    }
}
