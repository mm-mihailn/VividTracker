using Duende.IdentityServer.EntityFramework.Options;
using IdentityModel;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore.Internal;
using VividTracker.Data.EntityConfigurations;
using VividTracker.Data.Models;

namespace VividTracker.Data
{


    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Tenant> Tenants => Set<Tenant>();
        public DbSet<TrackingGroup> TrackingGroups => Set<TrackingGroup>();
        public DbSet<TrackingGroupRecord> TrackingGroupRecords => Set<TrackingGroupRecord>();
        public DbSet<TrackingItem> TrackingItems => Set<TrackingItem>();
        public DbSet<TrackingItemUserGroupsVisibility> TrackingItemUserGroupsVisibilities => Set<TrackingItemUserGroupsVisibility>();
        public DbSet<TrackingItemValue> TrackingItemValues => Set<TrackingItemValue>();
        public DbSet<TrackingItemValueActivity> TrackingItemValueActivities => Set<TrackingItemValueActivity>();
        public DbSet<UserGroup> UserGroups => Set<UserGroup>();
        
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("Users");
            builder.Entity<IdentityRole>().ToTable(name: "Roles");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            
            builder.ApplyConfiguration(new TenantEntityConfiguration());
            builder.ApplyConfiguration(new TrackingGroupEntityConfiguration());
            builder.ApplyConfiguration(new TrackingGroupRecordEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemUserGroupsVisibilityEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemValueActivityEntityConfiguration());
            builder.ApplyConfiguration(new TrackingItemValueEntityConfiguration());
            builder.ApplyConfiguration(new UserEntityConfiguration());
            builder.ApplyConfiguration(new UserGroupEntityConfiguration());
        }
    }
}