using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
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

        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int? id)
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
            var name = trackingGroup.Name.Trim();
            name = Regex.Replace(name, @"\s", "");

            var allTrackingGroups = await GetTrackersAsync();
            var isExist = allTrackingGroups.Any(t => Regex.Replace(t.Name.ToUpper(), @"\s", "") == name.ToUpper());
            if (isExist || string.IsNullOrWhiteSpace(name))
            {
                return null;
            }
            return await _trackingGroupsRepository.AddAsync(trackingGroup);
        }


        public async Task AddTrackerAsync(TrackingGroup tracker) => await _trackingGroupsRepository.AddAsync(tracker);

        public async Task<TrackingGroup?> GetTrackerByNameAsync(string name)
        {
            return await _trackingGroupsRepository.GetTrackerByName(name);
        }

        public async Task<IEnumerable<TrackingGroup>> GetTrackersAsync() => await _trackingGroupsRepository.GetAllTrackers();

        public async Task<TrackingGroup?> GetTrackerByIdAsync(int id) => await _trackingGroupsRepository.FindAsync(id);

        public async Task UpdateTrackerAsync(TrackingGroup TrackingGroup) => await _trackingGroupsRepository.UpdateAsync(TrackingGroup);

        public async Task<TrackingGroup> UpdateTrackingGroupLabel(TrackingGroup trackingGroup)
        {
            var tracker = await _trackingGroupsRepository.FindTrackingGroup(trackingGroup.Id);

            if (tracker != null)
            {
                if (tracker.Label == trackingGroup.Label)
                {
                    return null;
                }
                tracker.Label = trackingGroup.Label;
                await _trackingGroupsRepository.UpdateAsync(tracker);
                return tracker;
            }
            return null;
        }
    }
}
