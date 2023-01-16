using VividTracker.Data.Models;

namespace VividTracker.Data.Repositories.Interfaces;

public interface ITrackersRepository : IRepository<TrackingGroup>
{
    Task<int> GetCountAsync();
    Task<IEnumerable<TrackingGroup>> GetAllTrackers();
    Task<TrackingGroup?> GetTrackerByName(string name);
}
