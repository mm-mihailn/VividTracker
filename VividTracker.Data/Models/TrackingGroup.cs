namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class TrackingGroup
    {
        [Key]
        public int Id { get; set; }
        
        [MinLength(2)]
        public string Name { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }

        [MinLength(4)]
        public string Label { get; set; }
        public  virtual ICollection<TrackingItemGroup> TrackingItemGroups { get; set; }
    }
}
