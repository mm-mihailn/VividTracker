namespace VividTracker.Business.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface ITrackingGroupRecordsService
    {
        Task<IEnumerable<TrackingGroupRecord>> GetAllRecords(int trackingGroupId);
        Task<IEnumerable<TrackingGroupRecord>> GetAllTrackingGroupsRecordsAsync();
        Task<TrackingGroupRecord> CreateTrackingGroupRecord(TrackingGroupRecord trackingGroupRecord);
    }
}
