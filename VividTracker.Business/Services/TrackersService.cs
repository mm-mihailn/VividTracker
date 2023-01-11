using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Business.Services;

public class TrackersService : ITrackersService
{
    private readonly ITrackersRepository _trackersRepository;

    public TrackersService(ITrackersRepository trackersRepository)
    {
        _trackersRepository = trackersRepository;
    }

    public async Task AddTrackerAsync(TrackingGroup tracker) => await _trackersRepository.AddAsync(tracker);

    public async Task<TrackingGroup?> GetTrackerByNameAsync(string name)
    {
        return await _trackersRepository.GetTrackerByName(name);
    }

    public async Task<IEnumerable<TrackingGroup>> GetTrackersAsync() => await _trackersRepository.GetAllTrackers();

    public async Task<TrackingGroup?> GetTrackerByIdAsync(int id) => await _trackersRepository.FindAsync(id);

    public async Task UpdateTrackerAsync(TrackingGroup TrackingGroup) => await _trackersRepository.UpdateAsync(TrackingGroup);

}
