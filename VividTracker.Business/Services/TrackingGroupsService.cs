using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Business.Services
{
    public class TrackingGroupsService : ITrackingGroupsService
    {
        private readonly ITrackingGroupsRepository _trackingGroupsRepository;

        public TrackingGroupsService(ITrackingGroupsRepository trackingGroupsRepository)
        {
            _trackingGroupsRepository = trackingGroupsRepository;
        }
        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int id)
        {
            return await _trackingGroupsRepository.GetTrackingGroupsByTenantId(id);
        }
        public async Task AddTrackerAsync(TrackingGroup tracker) => await _trackingGroupsRepository.AddAsync(tracker);

        public async Task<TrackingGroup?> GetTrackerByNameAsync(string name)
        {
            return await _trackingGroupsRepository.GetTrackerByName(name);
        }

        public async Task<IEnumerable<TrackingGroup>> GetTrackersAsync() => await _trackingGroupsRepository.GetAllTrackers();

        public async Task<TrackingGroup?> GetTrackerByIdAsync(int id) => await _trackingGroupsRepository.FindAsync(id);

        public async Task UpdateTrackerAsync(TrackingGroup TrackingGroup) => await _trackingGroupsRepository.UpdateAsync(TrackingGroup);
    }
}
