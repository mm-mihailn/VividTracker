namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemValueActivity
    {
        public int Id { get; set; }
        public int TrackingItemValueId { get; set; }
        public TrackingItemValue TrackingItemValue { get; set; }
        [MaxLength(255)]
        public string? Comment { get; set; }
        public decimal? OldValue { get; set; }
        public DateTime TimeStamp { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
