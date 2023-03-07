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
            return Entities.Include(t => t.TrackingItem).Where(t => t.TrackingGroupRecordId == trackingGroupRecordId && t.TrackingItemId == trackingItemId).LastOrDefault();
        }
        public async Task<IEnumerable< TrackingItemValue>> GetItemValuesAsync(int trackingItemId)
        {
            return Entities.Where(t => t.TrackingItemId == trackingItemId);
        }
    }
}
