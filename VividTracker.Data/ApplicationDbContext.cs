using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System.Reflection.Emit;
using System.Reflection.Metadata.Ecma335;
using VividTracker.Data.Models;

namespace VividTracker.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Tenant> Tenats { get; set; }
        public DbSet<TrackingGroup> TrackingGroups { get; set; }
        public DbSet<TrackingGroupRecord> TrackingGroupRecords { get; set; }
        public DbSet<TrackingItem> TrackingItems { get; set; }
        public DbSet<TrackingItemGroup> TrackingItemGroups { get; set; }
        public DbSet<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public DbSet<TrackingItemValue> TrackingItemValues { get; set; }
        public DbSet<TrackingItemValueActivity> TrackingItemValueActivities { get; set; }
        public DbSet<UserGroups> UsersGroups { get; set; }
        public DbSet<UserGroupUsers> UserGroupUsers { get; set; }
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

             builder.Entity<TrackingItemGroup>()
            .HasOne(x => x.TrackingGroup)
            .WithMany(x => x.TrackingItemGroups)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<TrackingItemValue>()
           .HasOne(x => x.TrackingGroupRecord)
           .WithMany(x => x.TrackingItemValues)
           .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<TrackingItemsUserGroupsVisibility>()
           .HasOne(x => x.TrackingItemGroups)
           .WithMany(x => x.TrackingItemsUserGroupsVisibilities)
           .OnDelete(DeleteBehavior.Restrict);
        }
    }
}