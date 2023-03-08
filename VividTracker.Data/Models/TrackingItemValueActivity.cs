namespace VividTracker.Data.Models
{
    public class TrackingItemValueActivity
    {
        public TrackingItemValueActivity()
        {
            UserId = Guid.Empty.ToString();
        }
        public TrackingItemValueActivity(string userId, string? comment, decimal? oldValue, int trackingItemValueId, DateTime timeStamp) : this()
        {
            UserId = userId;
            Comment = comment;
            OldValue = oldValue;
            TrackingItemValueId = trackingItemValueId;
            TimeStamp = timeStamp;
        }
        public int Id { get; set; }
        public int TrackingItemValueId { get; set; }
        public string? Comment { get; set; }
        public decimal? OldValue { get; set; }
        public DateTime TimeStamp { get; set; }

        
        private TrackingItemValue? _trackingItemValue;
        public TrackingItemValue TrackingItemValue
        {
            get => _trackingItemValue ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingItemValue));
            set => _trackingItemValue = value;
        }
        
        public string UserId { get; set; }
        private User? _user;
        public User User
        {
            get => _user ?? throw new InvalidOperationException("Uninitialized property: " + nameof(User));
            set => _user = value;
        }
    }
}
