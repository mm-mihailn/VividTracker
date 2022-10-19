namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemValue
    {
        [Key]
        public int Id { get; set; }
        public decimal Value { get; set; }
        public virtual TrackingItem TrackingItem { get; set; }
        public int TrackingGroupRecordId { get; set; }
        public virtual TrackingGroupRecord TrackingGroupRecord { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
