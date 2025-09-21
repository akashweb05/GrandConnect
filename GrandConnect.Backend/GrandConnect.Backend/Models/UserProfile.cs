using System.ComponentModel.DataAnnotations;

namespace GrandConnect.Backend.Models
{
    public class UserProfile
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string DisplayName { get; set; } = null!;

        [Required]
        public string Interest { get; set; } = null!; // e.g. Gardening, Movies

        public string? Mood { get; set; } // 😊 🙂 😐 😞

        public int? RoomId { get; set; }
        public Room? Room { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
