namespace VividTracker.Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

   
    public class UserGroupsUsers
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public int UserGroupId { get; set; }
        public UserGroup UserGroup { get; set; }
    }
}
