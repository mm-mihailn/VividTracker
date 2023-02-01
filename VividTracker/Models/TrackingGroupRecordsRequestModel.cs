namespace VividTracker.Models
{
    using VividTracker.Data.Models;

    public class TrackingGroupRecordsRequestModel
    {
        public string Name { get; set; }
        public int TrackingGroupId { get; set; }
        public int? ParentId { get; set; }
        public bool Disabled { get; set; }
        public TrackingGroupRecord TrackingGroupRecords(TrackingGroup trackingGroup)
        {
            return new TrackingGroupRecord()
            {
                Name = Name,
                TrackingGroupId = trackingGroup.Id,
                Disabled= Disabled,
                ParentId = ParentId,
                TrackingGroup = trackingGroup
            };
        }
    }
}
