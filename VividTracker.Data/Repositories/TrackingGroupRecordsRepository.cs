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

    public class TrackingGroupRecordsRepository : Repository<TrackingGroupRecord>, ITrackingGroupRecordsRepository
    {
        public TrackingGroupRecordsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TrackingGroupRecord>> GetAllRecordsAsync(int trackingGroupId)
        {
            return await Entities.Include(t=>t.TrackingGroup.Tenant).Where(t=>t.TrackingGroupId==trackingGroupId).ToListAsync();
        }

        public async Task<IEnumerable<string>> GetAllTrackingGroupsRecords(int tenantId)
        {
            return await Entities.Where(t => t.TrackingGroup.TenantId == tenantId).Select(p => p.Name).Distinct().ToListAsync();
        }
    }
}
