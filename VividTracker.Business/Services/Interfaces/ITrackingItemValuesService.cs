using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Business.Services.Interfaces
{
    public interface ITrackingItemValuesService
    {
        Task<TrackingItemValue> AddTrackingItemValueAsync(TrackingItemValue itemValue);
        Task<TrackingItemValue> GetValueByCoordinatesAsync(int trackingGroupRecordId, int trackingItemId);
        Task<IEnumerable<TrackingItemValue>> GetItemValuesAsync(int trackingItemId);
        Task<TrackingItemValue> AddItemValueAsync(TrackingItemValue itemValue);
        Task<IEnumerable<TrackingItemValue>> GetAllValuesByTrackingGroupId(int trackingGroupId);
        Task<TrackingItemValue> GetTrackingItemValueById(int trackingItemValueId);
    }
}
