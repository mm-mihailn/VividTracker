using Microsoft.AspNetCore.Identity;

namespace VividTracker.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            Name = string.Empty;
            UserGroups = new List<UserGroup>();
            TrackingItemValueActivities =new List<TrackingItemValueActivity>();
            IsDeleted = false;
        }

        public User(string name):this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public string Name { get; set; }

        public int? TenantId { get; set; }
        public Tenant? Tenant { get; set; }
        public bool IsDeleted { get; set; }

        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
    }
}