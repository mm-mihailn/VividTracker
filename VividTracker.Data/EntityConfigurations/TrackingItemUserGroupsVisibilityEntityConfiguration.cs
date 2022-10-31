using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class TrackingItemUserGroupsVisibilityEntityConfiguration : IEntityTypeConfiguration<TrackingItemsUserGroupsVisibility>
    {
        public void Configure(EntityTypeBuilder<TrackingItemsUserGroupsVisibility> builder)
        {
            builder.ToTable("TrackingItemUserGroupsVisibilities");
            
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Visible);

            builder.HasOne(x => x.TrackingItem)
                .WithMany(x => x.TrackingItemsUserGroupsVisibilities)
                .HasForeignKey(x => x.TrackingItemId);

            builder.HasOne(x => x.UserGroup)
                .WithMany(x => x.TrackingItemsUserGroupsVisibilities)
                .HasForeignKey(x => x.UserGroupId);
        }
    }
}
