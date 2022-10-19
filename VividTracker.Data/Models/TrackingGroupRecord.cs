namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingGroupRecord
    {
        [Key]
        public int Id { get; set; }

        [MinLength(2)]
        public string Name { get; set; }
        public int? ParentId{ get; set; }
        public bool Disabled { get; set; }
        public int TrackingGroupId { get; set; }
        public virtual TrackingGroup TrackingGroup { get; set; }
        public virtual ICollection<TrackingItemValue> TrackingItemValues { get; set; }
    }
}
