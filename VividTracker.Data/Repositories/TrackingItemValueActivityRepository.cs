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

    public class TrackingItemValueActivityRepository : Repository<TrackingItemValueActivity>, ITrackingItemValueActivityRepository
    {
        public TrackingItemValueActivityRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<ICollection<TrackingItemValueActivity>?> GetCommentsByItemValueId(int? trackingItemValueId)
        {
           return  await Entities.Include(t=>t.TrackingItemValue).Include(t=>t.TrackingItemValue.TrackingGroupRecord).Include(t=>t.TrackingItemValue.TrackingItem.Tenant.TrackingGroups).Include(t=>t.User).Where(t=>t.TrackingItemValueId==trackingItemValueId).ToListAsync();
        }
    }
}
