using Duende.IdentityServer.EntityFramework.Options;
using IdentityModel;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;
using VividTracker.Data.EntityConfigurations;
using VividTracker.Data.Models;

namespace VividTracker.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Tenant> Tenats { get; set; }
        public DbSet<TrackingGroup> TrackingGroups { get; set; }
        public DbSet<TrackingGroupRecord> TrackingGroupRecords { get; set; }
        public DbSet<TrackingItem> TrackingItems { get; set; }
        public DbSet<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public DbSet<TrackingItemValue> TrackingItemValues { get; set; }
        public DbSet<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
        public DbSet<UserGroup> UsersGroups { get; set; }
        
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
           
            builder.Entity<User>().ToTable("Users");
            
            builder.ApplyConfiguration(new TenantEntityConfiguration());
            builder.ApplyConfiguration(new TrackingGroupRecordEntityConfiguration());
            builder.ApplyConfiguration(new UserGroupEntityConfiguration());
            builder.ApplyConfiguration(new TrackingGroupEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemUserGroupsVisibilityEntityCongiguration());
            builder.ApplyConfiguration(new TrackingItemValueActivityEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemValueActivityEntityConfiguration());
            builder.ApplyConfiguration(new UserEntityConfiguration());;
        }
    }
}