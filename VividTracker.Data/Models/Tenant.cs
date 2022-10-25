namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Tenant
    {
        public Tenant()
        {

        }
        public Tenant(ICollection<ApplicationUser> users, ICollection<UserGroup> usergroups, ICollection<TrackingGroup> trackinGroups, ICollection<TrackingItem> trackingItems)
        {
            Users = users;
            UserGroups = usergroups;
            TrackingGroups = trackinGroups;
            TrackingItems = trackingItems;
        }
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<ApplicationUser> Users { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<TrackingGroup> TrackingGroups { get; set; }
        public ICollection<TrackingItem> TrackingItems { get; set; }
    }
}
