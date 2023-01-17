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

        public Task<TrackingGroup?> GetTrackingGroupById(int id)
        {
            return _trackingGroupsRepository.FindTrackingGroup(id);
        }

        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int id)
        {
            return await _trackingGroupsRepository.GetTrackingGroupsByTenantId(id);
        }

       public async Task<TrackingGroup> UpdateTrackingGroupName(TrackingGroup trackingGroup)
        {
            var tracker = await _trackingGroupsRepository.FindTrackingGroup(trackingGroup.Id);
            if (tracker != null)
            {
                if (tracker.Name == trackingGroup.Name)
                {
                    return null;
                }
                tracker.Name = trackingGroup.Name;
                await _trackingGroupsRepository.UpdateAsync(tracker);
                return tracker;
            }
            return null;
        }
        public async Task<TrackingGroup> CreateTrackingGroup(TrackingGroup trackingGroup)
        {
            return await _trackingGroupsRepository.AddAsync(trackingGroup);
        }
    }
}
