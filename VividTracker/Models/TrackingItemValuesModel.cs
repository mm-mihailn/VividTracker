namespace VividTracker.Models
{
    using System.Xml.Linq;
    using VividTracker.Data.Models;
    public class TrackingItemValuesModel
    {
        public decimal Value { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public TrackingItemValue ToAddValue(int trackingItemId, int trackingGroupRecordId,TrackingItem trackingItem,TrackingGroupRecord trackingGroupRecord)
        {
            return new TrackingItemValue()
            {
                Value = Value,
                TrackingItemId = trackingItemId,
                TrackingGroupRecordId = trackingGroupRecordId,
                TimeStamp = TimeStamp,
                TrackingItem = trackingItem,
                TrackingGroupRecord = trackingGroupRecord
            };
        }
    }
}

