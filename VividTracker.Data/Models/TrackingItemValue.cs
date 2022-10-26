namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemValue
    {
        public TrackingItemValue(decimal value,TrackingItem trackingItem,TrackingGroupRecord trackingGroupRecord,DateTime timeStamp)
        {
             Value = value;
            _trackingItem = trackingItem;
            _trackingGroupRecord = trackingGroupRecord;
            TimeStamp = timeStamp;
        }
        public int Id { get; set; }
        public decimal Value { get; set; }
        public int TrackingItemId { get; set; }
        public TrackingItem _trackingItem { get; set; }
        public TrackingItem TrackingItem
        {
            get => _trackingItem ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingItem));
            set => _trackingItem = value;
        }
        public int TrackingGroupRecordId { get; set; }
        public TrackingGroupRecord _trackingGroupRecord { get; set; }
        public TrackingGroupRecord TrackingGroupRecord
        {
            get => _trackingGroupRecord ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingGroupRecord));
            set => _trackingGroupRecord = value;
        }
        public DateTime TimeStamp { get; set; }
    }
}
