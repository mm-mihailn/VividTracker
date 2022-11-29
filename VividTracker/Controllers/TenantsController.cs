namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections;
    using System.Linq;
    using VividTracker.Data.Models;
    using VividTracker.Data;
    using VividTracker.Data.Repositories;
    using VividTracker.Business.Services.Interfaces;
    using System.Drawing.Text;
    using System.Net;

    [ApiController]
    public class TenantsController : ControllerBase
    {
        private readonly ITenantsService _tenantsService;
        public TenantsController(ITenantsService tenantsService)
        {
            _tenantsService = tenantsService;
        }
        [HttpGet]
        [Route("api/tenants")]
        public async Task<IEnumerable<Tenant>> GetAllTenants()
        {
            return await _tenantsService.GetTenantsAsync();
        }

        [HttpPatch]
        [Route("api/edit/{id}")]
        public async Task<Tenant> EditTenantName([FromRoute] int id, [FromBody] Tenant newTenant)
        {
            var targetTenant = await _tenantsService.GetTenantByIdAsync(id);

            if (targetTenant != null)
            {
                targetTenant.Name = newTenant.Name;
            }

            _tenantsService.UpdateTenantAsync(targetTenant);

            return targetTenant;
        }
    }
}