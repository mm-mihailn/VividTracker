namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Enums;

    public class TrackingItem
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
        public bool IrrelevantAllowed { get; set; }
        public bool MandatoryComment { get; set; }
        public decimal? DefaultValue { get; set; }

        [MaxLength(7)]
        public string MaxValueColor { get; set; }

        [MaxLength(7)]
        public string MinValueColor { get; set; }

        [MaxLength(7)]
        public string IrrelevantColor { get; set; }

        [Precision(5, 2)]
        public decimal Target { get; set; }
        public PropertyType Type { get; set; }
        public string Name { get; set; }
        public ICollection<TrackingItemValue> TrackingItemsValues{ get; set; }
        public ICollection<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public ICollection<TrackingGroup> TrackingGroups { get; set; }

    }
}
