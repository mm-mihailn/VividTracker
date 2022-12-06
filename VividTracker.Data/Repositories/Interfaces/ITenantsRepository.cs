using VividTracker.Data.Models;

namespace VividTracker.Data.Repositories.Interfaces;

public interface ITenantsRepository : IRepository<Tenant>
{
    Task<int> GetCountAsync();
    Task<IEnumerable<Tenant>> GetAllTenants();
    Task<Tenant?> GetTenantByName(string name);
}