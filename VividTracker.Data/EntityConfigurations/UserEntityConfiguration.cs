using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VividTracker.Data.Models;

namespace VividTracker.Data.EntityConfigurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");
            
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).HasMaxLength(255);

            builder.HasOne(x => x.Tenant)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.TenantId)
                .IsRequired(false);

            builder.HasMany(x => x.UserGroups)
                .WithMany(x => x.Users);

            builder.HasMany(x => x.TrackingItemValueActivities)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);
        }
    }
}
