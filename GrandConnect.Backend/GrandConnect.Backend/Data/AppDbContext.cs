using GrandConnect.Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GrandConnect.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> opts) : base(opts) { }

        public DbSet<Room> Rooms => Set<Room>();

        public DbSet<UserProfile> Users => Set<UserProfile>();

    }
}
