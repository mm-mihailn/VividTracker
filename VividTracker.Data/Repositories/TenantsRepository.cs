using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Data.Repositories
{
    public class TenantsRepository : Repository<Tenant>, ITenantsRepository
    {
        public TenantsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<int> GetCountAsync() => await Entities.CountAsync();
        
        public async Task<IEnumerable<Tenant>> GetAllTenants() => await Entities.ToListAsync();
    }
}
