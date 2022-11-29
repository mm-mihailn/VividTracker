using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Business.Services.Interfaces
{
    public interface ITenantsService
    {
        Task<IEnumerable<Tenant>> GetTenantsAsync();
        Task<Tenant?> GetTenantByIdAsync(int id);

        Task UpdateTenantAsync(Tenant tenant);
    }
}
