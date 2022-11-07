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
    
}