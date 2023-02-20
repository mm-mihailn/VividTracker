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

    public class TrackingGroupRecordService : ITrackingGroupRecordsService
    {
        private readonly ITrackingGroupRecordsRepository  _trackingGroupRecordsRepository;
        public TrackingGroupRecordService(ITrackingGroupRecordsRepository trackingGroupRecordsRepository)
        {
            _trackingGroupRecordsRepository = trackingGroupRecordsRepository;
        }

        public async Task<TrackingGroupRecord> CreateTrackingGroupRecord(TrackingGroupRecord trackingGroupRecord)
        {
            return await _trackingGroupRecordsRepository.AddAsync(trackingGroupRecord);
        }

        public async Task<IEnumerable<TrackingGroupRecord>> GetAllRecords(int trackingGroupId)
        {
            return await _trackingGroupRecordsRepository.GetAllRecordsAsync(trackingGroupId);
        }

        public async Task<IEnumerable<string>> GetAllTrackingGroupsRecordsAsync(int tenantId)
        {
            return await _trackingGroupRecordsRepository.GetAllTrackingGroupsRecords(tenantId);
        }
    }
}
