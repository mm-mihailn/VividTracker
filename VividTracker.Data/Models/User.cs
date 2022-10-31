using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace VividTracker.Data.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            UserGroups = new List<UserGroup>();
            TrackingItemValueActivities =new List<TrackingItemValueActivity>();
        }
        public int TenantId { get; set; }

        private Tenant? _tenant;
        public Tenant Tenant
        {
            get => _tenant ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Tenant));
            set => _tenant = value;
        }
        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
    }
}