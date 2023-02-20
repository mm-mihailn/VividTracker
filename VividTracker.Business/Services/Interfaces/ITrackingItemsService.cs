namespace VividTracker.Business.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface ITrackingItemsService
    {
        Task<IEnumerable<TrackingItem>> GetTrackingItemsByTenantId (int id);
        Task<TrackingItem> AddTrackingItem(TrackingItem trackingItem, int trackingGroupId);
        Task<TrackingItem> UpdateTrackingGroupName(TrackingItem trackingItem);
        Task<TrackingItem> GetTrackingItemById(int trackingItem);
        Task<IEnumerable<TrackingItem>> GetTrackingItemsByTrackingGroupId(int trackingGroupId);
    }
}
