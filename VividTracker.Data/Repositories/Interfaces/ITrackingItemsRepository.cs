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
        Task<IEnumerable<TrackingItem>> GetTrackingItemByTenantId(int tenantId);
    }
}
