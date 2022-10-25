using Duende.IdentityServer.EntityFramework.Options;
using IdentityModel;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;
using VividTracker.Data.Models;

namespace VividTracker.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Tenant> Tenats { get; set; }
        public DbSet<TrackingGroup> TrackingGroups { get; set; }
        public DbSet<TrackingGroupRecord> trackinggrouprecords { get; set; }
        public DbSet<TrackingItem> TrackingItems { get; set; }
        public DbSet<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public DbSet<TrackingItemValue> TrackingItemValues { get; set; }
        public DbSet<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
        public DbSet<UserGroup> UsersGroups { get; set; }
        public DbSet<UserGroupsUsers> UserGroupUsers { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
           
        }
    }
}