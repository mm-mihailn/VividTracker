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
        public int Id { get; set; }
        public decimal Value { get; set; }
        public int TrackingItemId { get; set; }
        public TrackingItem TrackingItem { get; set; }
        public int TrackingGroupRecordId { get; set; }
        public TrackingGroupRecord TrackingGroupRecord { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
