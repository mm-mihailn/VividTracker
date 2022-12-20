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

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemByTenantId(int tenantId)
        {
            return await Entities.Include(t => t.Tenant).Where(t => t.TenantId == tenantId).ToListAsync();
        }
    }
}
