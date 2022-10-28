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

    public class UserGroupEntityConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name);

            builder
                .HasMany(p => p.Users)
                .WithMany(p => p.UserGroups)
                .UsingEntity(j => j.ToTable("UserGroupUsers"));

            builder.HasOne(x => x.Tenant)
                .WithMany(x => x.UserGroups)
                .HasForeignKey(x => x.TenantId)
                .OnDelete(DeleteBehavior.Restrict); ;

            builder.HasMany(x => x.Users)
                .WithMany(x => x.UserGroups);

            builder.HasMany(x => x.TrackingItemsUserGroupsVisibilities)
                .WithOne(x => x.UserGroup);
        }
    }
}
