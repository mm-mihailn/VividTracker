using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Business.Services;

public class TenantsService : ITenantsService
{
    private readonly ITenantsRepository _tenantsRepository;

    public TenantsService(ITenantsRepository tenantsRepository)
    {
        _tenantsRepository = tenantsRepository;
    }

    public async Task<IEnumerable<Tenant>> GetTenantsAsync() => await _tenantsRepository.GetAllTenants();

    public async Task<Tenant?> GetTenantByIdAsync(int id) => await _tenantsRepository.FindAsync(id);

    public async Task UpdateTenantAsync(Tenant tenant) => await _tenantsRepository.UpdateAsync(tenant);

    public async Task<Tenant?> AddTenantAsync(Tenant tenant)
    {
        var allTenants = await GetTenantsAsync();
        var name = tenant.Name.Trim();

        var isExist = allTenants.Any(t => t.Name.ToUpper() == name.ToUpper());
        if (!string.IsNullOrWhiteSpace(name))
        {
            if (!isExist)
            {
                return await _tenantsRepository.AddAsync(tenant);
            }
        }

        return null;
    }
    public async Task<Tenant?> GetTenantByNameAsync(string name)
    {
        return await _tenantsRepository.GetTenantByName(name);
    }

    public async Task<Tenant?> GetTenantByTaskIdAsync(Task<int?> id) => await _tenantsRepository.FindAsync(id);

}