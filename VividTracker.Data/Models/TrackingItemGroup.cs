namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemGroup
    {
        [Key]
        public int Id { get; set; }
        public int TrackingGroupId { get; set; }
        public virtual TrackingGroup TrackingGroup { get; set; }
        public int TrackingItemId { get; set; }
        public virtual TrackingItem TrackingItem { get; set; }
        public virtual ICollection<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set;}
    }
}
