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

    public class TrackingItemsService : ITrackingItemsService
    {
        private readonly ITrackingItemsRepository _trackingItemsRepository;

        public TrackingItemsService(ITrackingItemsRepository trackingItemsRepository)
        {
            _trackingItemsRepository = trackingItemsRepository;
        }

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemsByTenantId(int id)
        {
            return await _trackingItemsRepository.GetTrackingItemsByTenantId (id);
        }
    }
}
