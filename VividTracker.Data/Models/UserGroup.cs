namespace VividTracker.Data.Models
{
    public class UserGroup
    {
        public UserGroup()
        {
            Name = Guid.NewGuid().ToString();
            Users = new List<User>();
            TrackingItemsUserGroupsVisibilities = new List<TrackingItemsUserGroupsVisibility>();
        }
        public UserGroup(string name) : this()
        {
            Name = name;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int TenantId { get; set; }

        private Tenant? _tenant;
        public Tenant Tenant
        {
            get => _tenant ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Tenant));
            set => _tenant = value;
        }
        public ICollection<User> Users { get; set; }
        public ICollection<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
    }
}
