namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class TrackingGroupRecord
    {
        public TrackingGroupRecord()
        {
            Name = Guid.NewGuid().ToString();
            SubTrackingGroupRecords = new List<TrackingGroupRecord>();
            TrackingItemValues = new List<TrackingItemValue>();
        }

        public TrackingGroupRecord(TrackingGroup? trackingGroup, string name, bool disabled = false) :this()
        {
            _trackingGroup = trackingGroup;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Disabled = disabled;
        }

        public int Id { get; set; }

        [MinLength(2)]
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public TrackingGroupRecord? Parent { get; set; }
        public bool Disabled { get; set; }
        public int TrackingGroupId { get; set; }

        private TrackingGroup? _trackingGroup;
        public TrackingGroup TrackingGroup
        {
            get => _trackingGroup ?? throw new InvalidOperationException("Uninitialized property: " + nameof(TrackingGroup));
            set => _trackingGroup = value;
        }
        public ICollection<TrackingItemValue> TrackingItemValues { get; set; }
        public ICollection<TrackingGroupRecord> SubTrackingGroupRecords { get; set; }
    }
}
