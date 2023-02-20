namespace VividTracker.Business.Services
{
    using Duende.IdentityServer.Endpoints.Results;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories;
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
            return await _trackingItemsRepository.GetTrackingItemsByTenantId(id);
        }
       public async Task<TrackingItem> AddTrackingItem(TrackingItem trackingItem,int trackingGroupId)
        {

            var trackers = await GetTrackingItemsByTrackingGroupId(trackingGroupId);
            var isExist = trackers.FirstOrDefault(t => t.Name.ToUpper() == trackingItem.Name.ToUpper());

            if (isExist!=null)
            {
                return null;
            }
           return await _trackingItemsRepository.AddAsync(trackingItem);
        }
        public async Task<TrackingItem> UpdateTrackingGroupName(TrackingItem trackingItem)
        {
            var item = await _trackingItemsRepository.FindAsync(trackingItem.Id);
            if (item != null)
            {
                if (item.Name == trackingItem.Name)
                {
                    return null;
                }
                item.Name = trackingItem.Name;
                item.Tenant = trackingItem.Tenant;
                await _trackingItemsRepository.UpdateAsync(item);
                return item;
            }
            return null;
        }
        public async Task<TrackingItem> GetTrackingItemById(int trackingItem)
        {
            return await _trackingItemsRepository.GetTrackingItemById(trackingItem);
        }

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemsByTrackingGroupId(int trackingGroupId)
        {
            return await _trackingItemsRepository.GetTrackingItemsByTrackingGroupId(trackingGroupId);
        }
    }
}
