namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;

    public class TrackingGroup
    {
        public TrackingGroup()
        {
            Name = Guid.NewGuid().ToString();
            TrackingItems = new List<TrackingItem>();
            TrackingGroupRecords = new List<TrackingGroupRecord>();
        }
        public TrackingGroup(string name, string? label = null) :this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Label = label;
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
        public string? Label { get; set; }
        public ICollection<TrackingItem> TrackingItems { get; set; }
        public ICollection<TrackingGroupRecord> TrackingGroupRecords { get; set; }
    }
}
