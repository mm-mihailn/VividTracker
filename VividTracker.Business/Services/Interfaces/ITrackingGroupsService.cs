using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Business.Services.Interfaces
{
    public interface ITrackingGroupsService
    {
        Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int? id);
        Task<TrackingGroup?>GetTrackingGroupById(int id);
        Task<TrackingGroup> UpdateTrackingGroupName(TrackingGroup trackingGroup);
        Task<TrackingGroup> UpdateTrackingGroupLabel(TrackingGroup trackingGroup);
        Task<TrackingGroup> CreateTrackingGroup(TrackingGroup trackingGroup);

        Task<IEnumerable<TrackingGroup>> GetTrackersAsync();
        Task<TrackingGroup?> GetTrackerByNameAsync(string name);
        Task AddTrackerAsync(TrackingGroup tracker);
        Task<TrackingGroup?> GetTrackerByIdAsync(int id);
        Task UpdateTrackerAsync(TrackingGroup tracker);

    }
}
