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
        [Key]
        public int Id { get; set; }
        public int TrackingItemValueId { get; set;}
        public virtual TrackingItemValue TrackingItemValue { get; set; }
        public string Comment { get; set; }
        public string OldValue { get; set; }
        public DateTime TimeStamp { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
    }
}
