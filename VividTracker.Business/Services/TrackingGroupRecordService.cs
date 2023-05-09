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
            var allRecords = await _trackingGroupRecordsRepository.GetAllRecordsAsync(trackingGroupRecord.TrackingGroupId);
            var recordsName = allRecords.Select(t => t.Name).ToList();
            var name = trackingGroupRecord.Name.Trim();
           
            if (recordsName.Any(t=>t.ToUpper() == name.ToUpper()) || string.IsNullOrWhiteSpace(name))
            {
                return null;
            }
            return await _trackingGroupRecordsRepository.AddAsync(trackingGroupRecord);
        }

        public async Task<TrackingGroupRecord> GetTrackingGroupRecordById(int trackingGroupRecordId)
        {
            return await _trackingGroupRecordsRepository.FindAsync(trackingGroupRecordId);
        }

        public async Task<TrackingGroupRecord> GetTrackingGroupRecordByRecordId(int trackingGroupRecordId)
        {
            return await _trackingGroupRecordsRepository.GetTrackingGroupRecordById(trackingGroupRecordId);
        }

        public async Task<IEnumerable<TrackingGroupRecord>> GetAllRecords(int trackingGroupId)
        {
            return await _trackingGroupRecordsRepository.GetAllRecordsAsync(trackingGroupId);
        }

        public async Task<IEnumerable<string>> GetAllTrackingGroupsRecordsAsync(int tenantId,int trackingGroupId)
        {
            return await _trackingGroupRecordsRepository.GetAllTrackingGroupsRecords(tenantId, trackingGroupId);
        }
    }
}
