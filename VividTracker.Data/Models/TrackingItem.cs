using VividTracker.Data.Enums;

namespace VividTracker.Data.Models
{
    public class TrackingItem
    {
        //TODO: CHECK ID PROBLEM!
        public TrackingItem()
        {
            Name = Guid.NewGuid().ToString();
            MinValueColor = string.Empty;
            MaxValueColor = string.Empty;
            IrrelevantColor = string.Empty;
            TrackingItemsValues = new List<TrackingItemValue>();
            TrackingItemsUserGroupsVisibilities = new List<TrackingItemUserGroupsVisibility>();
            TrackingGroups = new List<TrackingGroup>();
        }

        public TrackingItem(int tenantId,string name,bool irrelevantAllowed, bool mandatoryComment, decimal? defaultValue, string maxValueColor, string minValueColor, string irrelevantColor, decimal target, PropertyType type,decimal? minValueType,decimal? maxValueType) :this()
        {
            TenantId=tenantId;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            IrrelevantAllowed = irrelevantAllowed;
            MandatoryComment = mandatoryComment;
            DefaultValue = defaultValue;
            MaxValueColor = maxValueColor;
            MinValueColor = minValueColor;
            IrrelevantColor = irrelevantColor;
            Target = target;
            Type = type;
            MinValueType = minValueType;
            MaxValueType = maxValueType;
        }
        public int Id { get; set; }
        public int TenantId { get; set; }
        private Tenant? _tenant;
        public Tenant Tenant
        {
            get => _tenant ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Tenant));
            set => _tenant = value;
        }
        public bool IrrelevantAllowed { get; set; }
        public bool MandatoryComment { get; set; }
        public decimal? DefaultValue { get; set; }
        public string MaxValueColor { get; set; }
        public string MinValueColor { get; set; }
        public string IrrelevantColor { get; set; }
        public decimal Target { get; set; }
        public PropertyType Type { get; set; }
        public string Name { get; set; }
        public decimal? MinValueType { get; set; }
        public decimal? MaxValueType { get; set; }
        public ICollection<TrackingItemValue> TrackingItemsValues{ get; set; }
        public ICollection<TrackingItemUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public ICollection<TrackingGroup> TrackingGroups { get; set; }
    }
}
