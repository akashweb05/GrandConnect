using System.ComponentModel.DataAnnotations;

namespace GrandConnect.Backend.Models
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }
        [Required]
        public string Name { get; set; } = null!; // e.g. "Gardening"
        public string Slug { get; set; } = null!; // e.g. "gardening-1234"
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<UserProfile> Users { get; set; } = new List<UserProfile>();
    }
}
