namespace VividTracker.Data.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class TrackingItemsRepository : Repository<TrackingItem>,ITrackingItemsRepository
    {
        public TrackingItemsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemsByTenantId(int tenantId)
        {
            return await Entities
                .Include(t => t.Tenant).Where(t => t.TenantId == tenantId).ToListAsync();
        }
        public async Task<TrackingItem> GetTrackingItemById(int id)
        {
            return await Entities.Include(t => t.Tenant).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemsByTrackingGroupId(int trackingGroupId)
        {
            return await Entities.Include(t => t.Tenant).Where(t => t.TrackingGroups.Any(t => t.Id == trackingGroupId)).ToListAsync();
        }
        public async Task<TrackingItem> FindByNameAsync(string name)
        {
            return await Entities.Include(t => t.Tenant).FirstOrDefaultAsync(t => t.Name.ToUpper()==name.ToUpper());
        }
    }
}
