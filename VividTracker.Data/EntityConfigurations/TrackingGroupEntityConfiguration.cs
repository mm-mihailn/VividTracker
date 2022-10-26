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

            builder.HasKey(t => t.Id);

            builder.HasMany(t => t.TrackingGroupRecords).WithOne(x => x.TrackingGroup).HasForeignKey(x => x.TrackingGroupId);
        }
    }
}
