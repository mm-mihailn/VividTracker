namespace VividTracker.Data.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class TrackingGroupRepository : Repository<TrackingGroup>, ITrackingGroupsRepository
    {
        public TrackingGroupRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupByTenantId(int tenantId)
        {
            return await Entities.Include(t=>t.Tenant).Where(t => t.TenantId == tenantId).ToListAsync();
        }
    }
}
