using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    internal class TrackingGroupRecordEntityConfiguration : IEntityTypeConfiguration<TrackingGroupRecord>
    {
        public void Configure(EntityTypeBuilder<TrackingGroupRecord> builder)
        {
            builder.ToTable("TrackingGroupRecords");
            
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Name).HasMaxLength(255);
            builder.Property(t => t.Disabled);

            builder.HasOne(r => r.Parent)
                .WithMany(r => r.SubTrackingGroupRecords)
                .HasForeignKey(r => r.ParentId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(r => r.TrackingGroup)
                .WithMany(tg => tg.TrackingGroupRecords)
                .HasForeignKey(r => r.TrackingGroupId);
            builder.HasMany(r => r.TrackingItemValues)
                .WithOne(v => v.TrackingGroupRecord)
                .HasForeignKey(v => v.TrackingGroupRecordId);
            builder.HasMany(r => r.SubTrackingGroupRecords)
                .WithOne(r => r.Parent)
                .HasForeignKey(r => r.ParentId);
        }
    }
}
