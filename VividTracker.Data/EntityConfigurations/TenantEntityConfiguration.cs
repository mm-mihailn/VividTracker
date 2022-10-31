using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    internal class TenantEntityConfiguration : IEntityTypeConfiguration<Tenant>
    {
        public void Configure(EntityTypeBuilder<Tenant> builder)
        {
            builder.ToTable("Tenants");

            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name).HasMaxLength(255);
            
            builder.HasMany(t => t.Users)
                .WithOne(u => u.Tenant)
                .HasForeignKey(u => u.TenantId);
            builder.HasMany(t => t.UserGroups)
                .WithOne(ug => ug.Tenant)
                .HasForeignKey(ug => ug.TenantId);
            builder.HasMany(t => t.TrackingGroups)
                .WithOne(tg => tg.Tenant)
                .HasForeignKey(tg => tg.TenantId);
            builder.HasMany(t => t.TrackingItems)
                .WithOne(ti => ti.Tenant)
                .HasForeignKey(ti => ti.TenantId);
        }
    }
}
