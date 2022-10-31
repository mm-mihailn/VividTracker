namespace VividTracker.Data.Models
{
    public class TrackingItemValue
    {
        public TrackingItemValue()
        {
            TrackingItemValueActivities = new List<TrackingItemValueActivity>();
        }
        public TrackingItemValue(decimal value, DateTime timeStamp):this()
        {
            Value = value;
            TimeStamp = timeStamp;
        }
        public int Id { get; set; }
        public decimal Value { get; set; }
        public int TrackingItemId { get; set; }

        private TrackingItem? _trackingItem;
        public TrackingItem TrackingItem
        {
            get => _trackingItem ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingItem));
            set => _trackingItem = value;
        }
        public int TrackingGroupRecordId { get; set; }

        private TrackingGroupRecord? _trackingGroupRecord;
        public TrackingGroupRecord TrackingGroupRecord
        {
            get => _trackingGroupRecord ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingGroupRecord));
            set => _trackingGroupRecord = value;
        }
        public DateTime TimeStamp { get; set; }
        public ICollection<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
    }
}
