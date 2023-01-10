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
    }
}
