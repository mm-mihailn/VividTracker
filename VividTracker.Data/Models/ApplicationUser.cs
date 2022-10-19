using Microsoft.AspNetCore.Identity;

namespace VividTracker.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public int TenantId { get;set; }
        public virtual Tenant Tenant { get;set; }
    }
}