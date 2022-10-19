namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingItemsUserGroupsVisibility
    {
        [Key]
        public int Id { get; set; }
        public int TrackingItemGroupsId { get; set; }
        public virtual TrackingItemGroup TrackingItemGroups { get; set; }
        public int UserGroupsId { get; set; }
        public virtual UserGroups UserGroups { get; set; }
        public bool Visible { get; set; }
    }
}
