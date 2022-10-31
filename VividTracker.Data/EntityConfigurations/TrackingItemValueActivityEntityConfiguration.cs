using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class TrackingItemValueActivityEntityConfiguration : IEntityTypeConfiguration<TrackingItemValueActivity>
    {
        public void Configure(EntityTypeBuilder<TrackingItemValueActivity> builder)
        {
            builder.ToTable("TrackingItemValueActivities");
            
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Comment).HasMaxLength(255);
            builder.Property(t => t.OldValue).HasPrecision(5, 2);
            builder.Property(t => t.TimeStamp);

            builder.HasOne(x => x.TrackingItemValue)
                .WithMany(x => x.TrackingItemValueActivities)
                .HasForeignKey(x => x.TrackingItemValueId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.User)
                .WithMany(x => x.TrackingItemValueActivities)
                .HasForeignKey(x => x.UserId);
        }
    }
}
