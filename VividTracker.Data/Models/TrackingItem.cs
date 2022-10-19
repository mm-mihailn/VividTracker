namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Enum;
    using Type = Enum.Type;

    public class TrackingItem 
    {
        [Key]
        public int Id { get; set; }
        public int TenantId { get; set; }
        public virtual Tenant Tenant { get; set; }
        public bool IrrelevantAllowed { get; set; }
        public bool MandatoryComment { get; set; }
        public bool DefaultValue { get; set; }
        public string MaxValueColor { get; set; }
        public string MinValueColor { get; set; }
        public string IrrelevantValueColor { get; set; }
        public int Target { get; set; } // ?? data type
        public Type Type { get; set; }
        public string Name { get; set; }
       

    }
}
