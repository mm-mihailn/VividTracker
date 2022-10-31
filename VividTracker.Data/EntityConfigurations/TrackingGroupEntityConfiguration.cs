using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class TrackingGroupEntityConfiguration : IEntityTypeConfiguration<TrackingGroup>
    {
        public void Configure(EntityTypeBuilder<TrackingGroup> builder)
        {
            builder.ToTable("TrackingGroups");

            builder.HasKey(tg => tg.Id);
            builder.Property(tg => tg.Name).HasMaxLength(255);
            builder.Property(tg => tg.Label).HasMaxLength(255);

            builder.HasOne(t => t.Tenant)
                .WithMany(tg => tg.TrackingGroups)
                .HasForeignKey(t => t.TenantId);

            builder.HasMany(tgr => tgr.TrackingGroupRecords)
                .WithOne(tg => tg.TrackingGroup)
                .HasForeignKey(tg => tg.TrackingGroupId);

            builder.HasMany(ti => ti.TrackingItems)
                .WithMany(tg => tg.TrackingGroups)
                .UsingEntity<Dictionary<string, object>>(
                "TrackingGroupTrackingItems",
                j => j
                    .HasOne<TrackingItem>()
                    .WithMany()
                    .HasForeignKey("TrackingItemId")
                    .HasConstraintName("FK_TrackingGroupTrackingItems_TrackingItems_TrackingItemId")
                    .OnDelete(DeleteBehavior.Cascade),
                j => j
                    .HasOne<TrackingGroup>()
                    .WithMany()
                    .HasForeignKey("TrackingGroupId")
                    .HasConstraintName("FK_TrackingGroupTrackingItems_TrackingGroups_TrackingGroupId")
                    .OnDelete(DeleteBehavior.ClientCascade));
        }
    }
}
