using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace VividTracker.Data.Models
{
    public class User : IdentityUser
    {
        public int TenantId { get; set; }
        public Tenant Tenant { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
    }
}