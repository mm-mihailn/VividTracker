namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemsUserGroupsVisibility
    {
        public int Id { get; set; }
        public int TrackingItemId { get; set; }
        public virtual TrackingItem TrackingItem { get; set; }
        public int UserGroupId { get; set; }
        public virtual UserGroup UserGroup { get; set; }
        public bool Visible { get; set; }
        public ICollection<TrackingItemValueActivity> TrackingItemsValuesActivities { get; set; }
    }
}
