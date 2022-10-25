namespace VividTracker.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant? Tenant { get; set; }
        public string? Label { get; set; }
        public ICollection<TrackingItem>? TrackingItems { get; set; }
        public ICollection<TrackingGroupRecord>? TrackingGroupRecords { get; set; }

    }
}
