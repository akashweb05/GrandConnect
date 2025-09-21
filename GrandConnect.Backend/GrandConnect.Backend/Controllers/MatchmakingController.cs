using GrandConnect.Backend.Data;
using GrandConnect.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GrandConnect.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchmakingController : ControllerBase
    {
        private readonly AppDbContext _db;

        public MatchmakingController(AppDbContext db)
        {
            _db = db;
        }

        public class MatchRequest
        {
            public string DisplayName { get; set; } = null!;
            public string Interest { get; set; } = null!;
            public string Mood { get; set; } = "🙂";
        }

        [HttpPost("join")]
        public async Task<IActionResult> Join([FromBody] MatchRequest req)
        {
            // Find existing room with same interest (with <5 users)
            var room = await _db.Rooms
                .Include(r => r.Users)
                .Where(r => r.Name == req.Interest)
                .OrderBy(r => r.CreatedAt)
                .FirstOrDefaultAsync();

            if (room == null)
            {
                room = new Room
                {
                    Name = req.Interest,
                    Description = $"Room for {req.Interest}",
                    Slug = $"{req.Interest.ToLower()}-{Guid.NewGuid().ToString().Substring(0, 6)}"
                };
                _db.Rooms.Add(room);
                await _db.SaveChangesAsync();
            }

            var user = new UserProfile
            {
                DisplayName = req.DisplayName,
                Interest = req.Interest,
                Mood = req.Mood,
                RoomId = room.RoomId
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(new { room.Slug, user.UserId, room.Name });
        }
    }
}
