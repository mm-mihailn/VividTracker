namespace VividTracker.Data.EntityConfigurations
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public class TrackingItemUserGroupsVisibilityEntityCongiguration : IEntityTypeConfiguration<TrackingItemsUserGroupsVisibility>
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
