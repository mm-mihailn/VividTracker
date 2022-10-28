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

    public class TrackingItemValueEntityConfiguration : IEntityTypeConfiguration<TrackingItemValue>
    {
        public void Configure(EntityTypeBuilder<TrackingItemValue> builder)
        {
            builder.ToTable("TarckingItemsValue");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Value);
            builder.Property(x => x.TimeStamp);

            builder.HasOne(x => x.TrackingItem)
                .WithMany(x => x.TrackingItemsValues)
                .HasForeignKey(x => x.TrackingItemId)
                .OnDelete(DeleteBehavior.Restrict); ;

            builder.HasOne(x => x.TrackingGroupRecord)
                .WithMany(x => x.TrackingItemValues)
                .HasForeignKey(x => x.TrackingGroupRecordId);
        }
    }
}
