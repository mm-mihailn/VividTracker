using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class UserGroupEntityConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder.ToTable("UserGroups");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(255);

            builder
                .HasMany(p => p.Users)
                .WithMany(p => p.UserGroups)
                .UsingEntity<Dictionary<string, object>>(
                "UserGroupUsers",
                j => j
                    .HasOne<User>()
                    .WithMany()
                    .HasForeignKey("UserId")
                    .HasConstraintName("FK_UserGroupUsers_Users_UserId")
                    .OnDelete(DeleteBehavior.Cascade),
                j => j
                    .HasOne<UserGroup>()
                    .WithMany()
                    .HasForeignKey("UserGroupId")
                    .HasConstraintName("FK_UserGroupUsers_UserGroups_UserGroupId")
                    .OnDelete(DeleteBehavior.ClientCascade));

            builder.HasOne(x => x.Tenant)
                .WithMany(x => x.UserGroups)
                .HasForeignKey(x => x.TenantId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.Users)
                .WithMany(x => x.UserGroups);

            builder.HasMany(x => x.TrackingItemsUserGroupsVisibilities)
                .WithOne(x => x.UserGroup);
        }
    }
}
