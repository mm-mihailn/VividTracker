namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemValueActivity
    {
        public TrackingItemValueActivity()
        {

        }
        public TrackingItemValueActivity(TrackingItemValue? trackingItemValue,string? comment, decimal? oldValue, DateTime timeStamp,User? user):this()
        {
            _trackingItemValue = trackingItemValue;
            Comment = comment;
            OldValue = oldValue;
            TimeStamp = timeStamp;
            _user = User;
        }
        public int Id { get; set; }
        public int TrackingItemValueId { get; set; }
        private TrackingItemValue? _trackingItemValue { get; set; }
        public TrackingItemValue TrackingItemValue
        {
            get => _trackingItemValue ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingItemValue));
            set => _trackingItemValue = value;
        }
        [MaxLength(255)]
        public string? Comment { get; set; }
        public decimal? OldValue { get; set; }
        public DateTime TimeStamp { get; set; }
        public string UserId { get; set; } = Guid.NewGuid().ToString();
        private User? _user { get; set; }
        public User User
        {
            get => _user ?? throw new InvalidOperationException("Uninitialized property: " + nameof(User));
            set => _user = value;
        }
    }
}
