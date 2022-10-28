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

    public class TrackingItemValueActivityEntityConfiguration : IEntityTypeConfiguration<TrackingItemValueActivity>
    {
        public void Configure(EntityTypeBuilder<TrackingItemValueActivity> builder)
        {
            builder.ToTable("TrackingItemsValueActivities");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Comment);
            builder.Property(t => t.OldValue);
            builder.Property(t => t.TimeStamp);

            builder.HasOne(x => x.TrackingItemValue)
                .WithMany(x => x.TrackingItemValueActivities)
                .HasForeignKey(x => x.TrackingItemValueId);

            builder.HasOne(x => x.User)
                .WithMany(x => x.TrackingItemValueActivities)
                .HasForeignKey(x => x.UserId);
        }
    }
}
