using Duende.IdentityServer.EntityFramework.Options;
using IdentityModel;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
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
            
            //Todo rename the other User Tables
            builder.Entity<User>().ToTable("Users");
            
            //Todo add configurations for all entities
            builder.ApplyConfiguration(new TenantEntityConfiguration());
            builder.ApplyConfiguration(new TrackingGroupRecordEntityConfiguration());
            
            //Todo move this config in a UserGroupEntityConfiguration 
            builder
                .Entity<UserGroup>()
                .HasMany(p => p.Users)
                .WithMany(p => p.UserGroups)
                .UsingEntity(j => j.ToTable("UserGroupUsers"));
        }
    }
}