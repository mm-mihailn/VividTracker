namespace VividTracker.Data.EntityConfigurations
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public class TrackingItemEntityConfiguration : IEntityTypeConfiguration<TrackingItem>
    {
        public void Configure(EntityTypeBuilder<TrackingItem> builder)
        {
            builder.ToTable("TrackingItems");

            builder.HasKey(t => t.Id);
            builder.Property(t => t.IrrelevantAllowed);
            builder.Property(t => t.MandatoryComment);
            builder.Property(t => t.DefaultValue).HasPrecision(5, 2);
            builder.Property(t => t.MaxValueColor).HasMaxLength(7);
            builder.Property(t => t.MinValueColor).HasMaxLength(7);
            builder.Property(t => t.IrrelevantColor).HasMaxLength(7);
            builder.Property(t => t.Target).HasPrecision(5, 2);
            builder.Property(t => t.Type);
            builder.Property(t => t.Name).HasMaxLength(255);

            builder.HasOne(x => x.Tenant)
                .WithMany(x => x.TrackingItems)
                .HasForeignKey(x => x.TenantId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(t => t.TrackingItemsValues)
                .WithOne(t => t.TrackingItem)
                .HasForeignKey(x => x.TrackingItemId);

            builder.HasMany(t => t.TrackingItemsUserGroupsVisibilities)
                .WithOne(t => t.TrackingItem)
                .HasForeignKey(t => t.TrackingItemId);
        }
    }
}
