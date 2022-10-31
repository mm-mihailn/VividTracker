namespace VividTracker.Data.Models
{
    public class Tenant
    {
        public Tenant()
        {
            Name = Guid.NewGuid().ToString();
            Users = new List<User>();
            UserGroups = new List<UserGroup>();
            TrackingGroups = new List<TrackingGroup>();
            TrackingItems = new List<TrackingItem>();
        }
        public Tenant(string name) : this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<UserGroup> UserGroups { get; set; }
        public ICollection<TrackingGroup> TrackingGroups { get; set; }
        public ICollection<TrackingItem> TrackingItems { get; set; }
    }
}
