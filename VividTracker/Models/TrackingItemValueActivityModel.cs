namespace VividTracker.Models
{
    using System.Xml.Linq;
    using VividTracker.Data.Models;

    public class TrackingItemValueActivityModel
    {
        public string Comment { get; set; } = null!;
        public DateTime TimeStamp { get; set; }
        public string UserId { get; set; } = null!;

        public TrackingItemValueActivity ToCreateComment(int trackingItemValueId)
        {
            return new TrackingItemValueActivity()
            {
                TrackingItemValueId = trackingItemValueId,
                Comment = Comment,
                TimeStamp = TimeStamp,
                UserId = UserId
            };
        }
    }
}
