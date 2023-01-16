using Microsoft.EntityFrameworkCore;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Data.Repositories
{
    public class TrackersRepository : Repository<TrackingGroup>, ITrackersRepository
    {
        public TrackersRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TrackingGroup>> GetAllTrackers() => await Entities.ToListAsync();

        public async Task<int> GetCountAsync() => await Entities.CountAsync();

        public async Task<TrackingGroup?> GetTrackerByName(string name)
        {
            return await Entities.FirstOrDefaultAsync(t => t.Name == name);
        }
    }
}

