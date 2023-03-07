using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Data.Repositories
{
    public class TrackingItemValuesRepository : Repository<TrackingItemValue>, ITrackingItemValuesRepository
    {
        public TrackingItemValuesRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<TrackingItemValue?> GetValueByCoordinatesAsync(int trackingGroupRecordId, int trackingItemId)
        {
            return Entities.Include(t => t.TrackingItem.Tenant).Include(t => t.TrackingGroupRecord.TrackingGroup).Where(t => t.TrackingGroupRecordId == trackingGroupRecordId && t.TrackingItemId == trackingItemId).OrderBy(t => t.Id).LastOrDefault();
        }
        public async Task<IEnumerable< TrackingItemValue>> GetItemValuesAsync(int trackingItemId)
        {
            return Entities.Include(t => t.TrackingItem.Tenant).Include(t => t.TrackingGroupRecord.TrackingGroup).Where(t => t.TrackingItemId == trackingItemId);
        }
    }
}
