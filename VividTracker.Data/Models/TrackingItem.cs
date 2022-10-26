namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using System.Xml.Linq;
    using VividTracker.Data.Enums;

    public class TrackingItem
    {
        public TrackingItem()
        {
            Name = Guid.NewGuid().ToString();
            TrackingItemsValues = new List<TrackingItemValue>();
            TrackingItemsUserGroupsVisibilities = new List<TrackingItemsUserGroupsVisibility>();
            TrackingGroups = new List<TrackingGroup>();
        }

        public TrackingItem(string name,bool irrelevantAllowed, bool mandatoryComment, decimal? defaultValue, string maxValueColor, string minValueColor, string irrelevantColor, decimal target, PropertyType type, Tenant tenant) :this()
        {
            Name = name ?? throw new ArgumentNullException(nameof(name));
            IrrelevantAllowed = irrelevantAllowed;
            MandatoryComment = mandatoryComment;
            DefaultValue = defaultValue;
            MaxValueColor = maxValueColor;
            MinValueColor = minValueColor;
            IrrelevantColor = irrelevantColor;
            Target = target;
            Type = type;
            _tenant = tenant;
        }

        public int Id { get; set; }
        public int TenantId { get; set; }
        public  Tenant _tenant { get; set; }

        public Tenant Tenant
        {
            get => _tenant ?? throw new InvalidOperationException("Uninitialized property: " + nameof(Tenant));
            set => _tenant = value;
        }
        public bool IrrelevantAllowed { get; set; }
        public bool MandatoryComment { get; set; }
        public decimal? DefaultValue { get; set; }

        //[MaxLength(7)]
        public string MaxValueColor { get; set; }

        //[MaxLength(7)]
        public string MinValueColor { get; set; }

        //[MaxLength(7)]
        public string IrrelevantColor { get; set; }

        //[Precision(5, 2)]
        public decimal Target { get; set; }
        public PropertyType Type { get; set; }
        public string Name { get; set; }
        public ICollection<TrackingItemValue> TrackingItemsValues{ get; set; }
        public ICollection<TrackingItemsUserGroupsVisibility> TrackingItemsUserGroupsVisibilities { get; set; }
        public ICollection<TrackingGroup> TrackingGroups { get; set; }
    }
}
