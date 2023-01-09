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

    public class TrackingItemsService : ITrackingItemsService
    {
        private readonly ITrackingItemsRepository _trackingItemsRepository;

        public TrackingItemsService(ITrackingItemsRepository trackingItemsRepository)
        {
            _trackingItemsRepository = trackingItemsRepository;
        }

        public async Task<IEnumerable<TrackingItem>> GetTrackingItemsByTenantId(int id)
        {
            return await _trackingItemsRepository.GetTrackingItemsByTenantId(id);
        }
        public async Task<TrackingItem> AddTrackingItem(int tenantId,TrackingItem tr)
        {
            tr = new TrackingItem()
            {
                TenantId = tenantId,
                IrrelevantAllowed = tr.IrrelevantAllowed,
                MandatoryComment = tr.MandatoryComment,
                MaxValueColor = tr.MaxValueColor,
                MinValueColor = tr.MinValueColor,
                IrrelevantColor = tr.IrrelevantColor,
                Target = tr.Target,
                Type = tr.Type,
                Name = tr.Name
            };
            await _trackingItemsRepository.AddAsync(tr);
            return tr;
        }
    }
}
