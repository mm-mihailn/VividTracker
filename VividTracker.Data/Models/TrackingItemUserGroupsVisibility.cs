namespace VividTracker.Data.Models
{
    public class TrackingItemUserGroupsVisibility
    {
        public TrackingItemUserGroupsVisibility()
        {
            
        }
        public TrackingItemUserGroupsVisibility(bool visible):this()
        {
            Visible = visible;
        }
        public int Id { get; set; }
        public int TrackingItemId { get; set; }

        private TrackingItem? _trackingItem;
        public TrackingItem TrackingItem
        {
            get => _trackingItem ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingItem));
            set => _trackingItem = value;
        }
        public int UserGroupId { get; set; }

        private UserGroup? _userGroup;
        public UserGroup UserGroup
        {
            get => _userGroup ?? throw new InvalidOperationException("Uninitialized property: " + nameof(UserGroup));
            set => _userGroup = value;
        }
        public bool Visible { get; set; }
    }
}
