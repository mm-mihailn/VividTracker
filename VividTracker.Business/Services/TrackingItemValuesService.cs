using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Business.Services
{
    public class TrackingItemValuesService : ITrackingItemValuesService
    {
        private readonly ITrackingItemValuesRepository _trackingItemValuesRepository;

        public TrackingItemValuesService(ITrackingItemValuesRepository trackingItemValuesRepository)
        {
            _trackingItemValuesRepository = trackingItemValuesRepository;
        }

        public async Task<TrackingItemValue> UpdateTrackingItemValueAsync(TrackingItemValue itemValue)
        {
            var validId = await GetAllValuesByTrackingGroupId(itemValue.Id);

            if (validId == null)
            {
                return null;
            }
            await _trackingItemValuesRepository.UpdateAsync(itemValue);
            return itemValue;
        }
        public Task<TrackingItemValue> GetValueByCoordinatesAsync(int trackingGroupRecordId, int trackingItemId) => _trackingItemValuesRepository.GetValueByCoordinatesAsync(trackingGroupRecordId, trackingItemId);
        public Task<IEnumerable<TrackingItemValue>> GetItemValuesAsync(int trackingItemId) => _trackingItemValuesRepository.GetItemValuesAsync(trackingItemId);
        public async Task<TrackingItemValue> AddItemValueAsync(TrackingItemValue itemValue) => await _trackingItemValuesRepository.AddAsync(itemValue);

        public async Task<IEnumerable<TrackingItemValue>> GetAllValuesByTrackingGroupId(int trackingGroupId)
        {
            return await _trackingItemValuesRepository.GetAllValuesByTrackingGroupId(trackingGroupId);
        }

        public async Task<TrackingItemValue> GetTrackingItemValueById(int trackingItemValueId)
        {
           var result  =  await _trackingItemValuesRepository.GetTrackingItemValueById(trackingItemValueId);

           if (result == null)
           {
               return null;
           }

           return result;
        }
    }
}
