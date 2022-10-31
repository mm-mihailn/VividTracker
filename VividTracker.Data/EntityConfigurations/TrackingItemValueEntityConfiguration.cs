using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class TrackingItemValueEntityConfiguration : IEntityTypeConfiguration<TrackingItemValue>
    {
        public void Configure(EntityTypeBuilder<TrackingItemValue> builder)
        {
            builder.ToTable("TrackingItemsValues");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Value).HasPrecision(5, 2);
            builder.Property(x => x.TimeStamp);

            builder.HasOne(x => x.TrackingItem)
                .WithMany(x => x.TrackingItemsValues)
                .HasForeignKey(x => x.TrackingItemId);

            builder.HasOne(x => x.TrackingGroupRecord)
                .WithMany(x => x.TrackingItemValues)
                .HasForeignKey(x => x.TrackingGroupRecordId);
        }
    }
}
