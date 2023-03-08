using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Data.Repositories.Interfaces
{
    public interface ITrackingItemValuesRepository : IRepository<TrackingItemValue>
    {
        Task<TrackingItemValue> GetValueByCoordinatesAsync(int trackingGroupRecordId, int trackingItemId);
        Task<IEnumerable<TrackingItemValue>> GetItemValuesAsync(int trackingItemId);
    }
}
