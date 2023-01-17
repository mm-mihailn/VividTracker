namespace VividTracker.Models
{
    using VividTracker.Data.Models;

    public class TrackingGroupRequestModel
    {
        public string Name { get; set; }
        public string Label { get; set; }

        public TrackingGroup ToCreateTrackingGroup(Tenant tenant)
        {
            return new TrackingGroup()
            {
                Name = Name,
                Label = Label,
                Tenant = tenant,
                TenantId = tenant.Id
            };
        }
    }
}
