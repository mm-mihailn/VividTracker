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
        public virtual Tenant Tenant { get; set; }
        public ICollection<ApplicationUser> ApplicationUsers { get; set; }
        public ICollection<TrackingItemsUserGroupsVisibility>? TrackingItemsUserGroupsVisibility { get; set; }
    }
}
