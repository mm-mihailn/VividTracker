namespace VividTracker.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class TrackingGroupService : ITrackingGroupService
    {
        private readonly ITrackingGroupsRepository _trackingGroupsRepository;

        public TrackingGroupService(ITrackingGroupsRepository trackingGroupsRepository)
        {
            _trackingGroupsRepository = trackingGroupsRepository;
        }

        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int tenantId)
        {
            return await _trackingGroupsRepository.GetTrackingGroupByTenantId(tenantId);
        }
    }
}
