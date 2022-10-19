namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class Tenant
    {
        [Key]
        public int Id { get; set; }

        [MinLength(4)]
        public string Name { get; set; }
    }
}
