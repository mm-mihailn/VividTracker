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

    public class TrackingGroupEntityConfiguration : IEntityTypeConfiguration<TrackingGroup>
    {
        public void Configure(EntityTypeBuilder<TrackingGroup> builder)
        {
            builder.ToTable("TrackingGroups");

            builder.HasKey(tg => tg.Id);
            builder.Property(tg => tg.Name).HasMaxLength(255);
            builder.Property(tg => tg.Label);

            builder.HasOne(t => t.Tenant)
                .WithMany(tg => tg.TrackingGroups)
                .HasForeignKey(t => t.TenantId);

            builder.HasMany(tgr => tgr.TrackingGroupRecords)
                .WithOne(tg => tg.TrackingGroup)
                .HasForeignKey(tg => tg.TrackingGroupId);

            builder.HasMany(ti => ti.TrackingItems)
                .WithMany(tg => tg.TrackingGroups)
                .UsingEntity(j => j.ToTable("TrackingGroupTrackingItems"));
        }
    }
}
