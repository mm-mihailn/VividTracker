namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class UserGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
    }
}
