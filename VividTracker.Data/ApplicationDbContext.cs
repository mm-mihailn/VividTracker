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

            SeedInitialData(builder);
            AdditionalSeeder(builder);
        }

        private void SeedInitialData(ModelBuilder builder)
        {
            //Add user and role
            var roleName = "Administrator";
            var adminRoleId = Guid.NewGuid().ToString();
            builder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = adminRoleId, 
                Name = roleName, 
                NormalizedName = roleName.ToUpper()
            });

            var email = "admin@vividtracker.net";
            var adminUserId = Guid.NewGuid().ToString();
            var user = new User
            {
                Id = adminUserId,
                UserName = email,
                NormalizedUserName = email.ToUpper(),
                Email = email,
                NormalizedEmail = email.ToUpper(),
                EmailConfirmed = true,
                LockoutEnabled = false,
                PhoneNumber = "1234567890",
                Tenant = null,
                Name = "John Smith"
            };
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, "V!v!dTr@ck3r");
            builder.Entity<User>().HasData(user);

            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>
                {
                    RoleId = adminRoleId,
                    UserId = adminUserId
                }
            );

            //Seed Tenants
            builder.Entity<Tenant>().HasData(
                new Tenant {Id = 1, Name = "Mentormate" },
                new Tenant{Id = 2, Name = "HardSoft Inc." },
                new Tenant{Id = 3, Name = "Dream Corp" },
                new Tenant{Id = 4, Name = "PM Corse Racing Team" },
                new Tenant{Id = 5, Name = "Low Peak High School" }
                );
        }
        private void AdditionalSeeder(ModelBuilder builder)
        {
            builder.Entity<TrackingGroup>().HasData(
                new TrackingGroup
                {
                    Id = 1,
                    Name = "DB Department",
                    TenantId = 2,
                    Label = "Work"
                }
                , new TrackingGroup()
                {
                    Id = 2,
                    Name = ".NET Backend",
                    TenantId = 2,
                    Label = "Backend"
                });
                    


            builder.Entity<TrackingGroupRecord>().HasData(
                new TrackingGroupRecord
                {
                    Id = 1,
                    Name = "VividTracker", 
                    ParentId = null,
                    Disabled = false, 
                    TrackingGroupId = 1
                },
                new TrackingGroupRecord
                {   Id = 2, 
                    Name = "Google",
                    ParentId = null, 
                    Disabled = false,
                    TrackingGroupId = 2 }
            );

            builder.Entity<TrackingItem>().HasData(new TrackingItem()
                {
                    Id = 1,
                    TenantId = 2,
                    IrrelevantAllowed = true,
                    MandatoryComment = false,
                    DefaultValue = 10,
                    MaxValueColor = "#FFFFF",
                    MinValueColor = "#FFFFF",
                    IrrelevantColor = "#FFFFF",
                    Target = 20,
                    Name = "Code coverage",
                    MinValueType = 0,
                    MaxValueType = 1
                }
                , new TrackingItem()
                {
                    Id = 2,
                    TenantId = 2,
                    IrrelevantAllowed = true,
                    MandatoryComment = false,
                    DefaultValue = 69,
                    MaxValueColor = "#FFFFF",
                    MinValueColor = "#FFFFF",
                    IrrelevantColor = "#FFFFF",
                    Target = 100,
                    Name = "Branch Strategy",
                    MinValueType = 0,
                    MaxValueType = 1
                });

            builder.Entity<TrackingItemValue>().HasData(
                new TrackingItemValue 
                    {   Id = 1,
                        Value = 15, 
                        TrackingItemId = 1, 
                        TrackingGroupRecordId = 1
                    },
                new TrackingItemValue 
                    {   Id = 2, 
                        Value = 69, 
                        TrackingItemId = 2,
                        TrackingGroupRecordId = 2
                });


            builder.Entity<TrackingGroup>()
                .HasMany(t=>t.TrackingItems)
                .WithMany(b => b.TrackingGroups)
                .UsingEntity<Dictionary<string, object>>(
                    "TrackingGroupTrackingItems",
                    bt=>bt.HasData(
                        new {TrackingItemId = 1 , TrackingGroupId = 1},
                        new {TrackingItemId = 2, TrackingGroupId = 2}
                        )
                );
        }
    }
}