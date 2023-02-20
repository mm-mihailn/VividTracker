namespace VividTracker.Data.Repositories.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface ITrackingItemsRepository:IRepository<TrackingItem>
    {
        Task<IEnumerable<TrackingItem>> GetTrackingItemsByTenantId(int tenantId);
        Task<IEnumerable<TrackingItem>> GetTrackingItemsByTrackingGroupId(int trackingGroupId);
        Task<TrackingItem> GetTrackingItemById(int id);
        Task<TrackingItem> FindByNameAsync(string name);
    }
}
