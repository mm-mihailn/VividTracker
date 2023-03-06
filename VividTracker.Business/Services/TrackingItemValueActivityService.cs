namespace VividTracker.Business.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class TrackingItemValueActivityService:ITrackingItemValueActivityService
    {
        private readonly ITrackingItemValueActivityRepository _trackingItemValueActivityRepository;

        public TrackingItemValueActivityService(ITrackingItemValueActivityRepository trackingItemValueActivityRepository)
        {
            _trackingItemValueActivityRepository = trackingItemValueActivityRepository;
        }

        public async Task AddComment(TrackingItemValueActivity? trackingItemValueActivity)
        {
            await _trackingItemValueActivityRepository.AddAsync(trackingItemValueActivity);
        }

        public async Task<ICollection<TrackingItemValueActivity>?> GetCommentsByTrackingItemId(int trackingItemValueId)
        {
            return await _trackingItemValueActivityRepository.GetCommentsByItemValueId(trackingItemValueId);
        }
    }
}
