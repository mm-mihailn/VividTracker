using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Data.Repositories.Interfaces
{
    public interface ITrackingGroupsRepository : IRepository<TrackingGroup>
    {
        Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int tenantId);
        Task<int> GetCountAsync();
        Task<IEnumerable<TrackingGroup>> GetAllTrackers();
        Task<TrackingGroup?> GetTrackerByName(string name);
    }
}
