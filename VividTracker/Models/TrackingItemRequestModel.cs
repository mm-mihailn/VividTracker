namespace VividTracker.Models
{
    using System;
    using VividTracker.Data.Enums;
    using VividTracker.Data.Models;

    public class TrackingItemRequestModel
    {
        public bool IrrelevanAllowed { get; set; }
        public bool MandatoryComment { get; set; }
        public decimal DefaultValue { get; set; }
        public decimal? MinValueType { get; set; }
        public decimal? MaxValueType { get; set; }
        public string? MaxValueColor { get; set; }
        public string? MinValueColor { get; set; }
        public string? IrrelevantColor { get; set; }
        public decimal Target { get; set; }
        public PropertyType Type { get; set; }
        public string? Name { get; set; }

        public TrackingItem ToCreateTrackingItem(int tenantId,Tenant tenant)
        {
            return new TrackingItem()
            {
                TenantId= tenant.Id,
                IrrelevantAllowed = IrrelevanAllowed,
                MandatoryComment = MandatoryComment,
                DefaultValue = DefaultValue,
                MaxValueColor = MaxValueColor,
                MinValueColor = MinValueColor,
                IrrelevantColor = IrrelevantColor,
                Target = Target,
                Type = Type,
                Name = Name,
                MinValueType = MinValueType,
                MaxValueType = MaxValueType,
                Tenant=tenant
            };
        }

        public TrackingItem GetTrackingItem(int trackingItemId,Tenant tenant)
        {
            return new TrackingItem()
            {
                TenantId = tenant.Id,
                Id = trackingItemId,
                Name = Name,
                Tenant = tenant
            };
        }
    }
}
