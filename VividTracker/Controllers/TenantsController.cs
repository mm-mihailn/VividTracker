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
    using Microsoft.CodeAnalysis.CSharp.Syntax;

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
        public async Task<IActionResult> EditTenantName([FromRoute] int id, [FromBody] Tenant newTenant)
        {
            var targetTenant = await _tenantsService.GetTenantByIdAsync(id);
            if (targetTenant == null)
            {
              return NotFound();  
            }
            
            if (targetTenant.Name == null||targetTenant.Name==string.Empty)
            {
                return BadRequest();
            }
            if (targetTenant.Name == newTenant.Name)
            {
                return BadRequest();
            }
            targetTenant.Name = newTenant.Name;
            await _tenantsService.UpdateTenantAsync(targetTenant);

            return Ok(targetTenant);
        }
        [HttpPost]
        [Route("api/create")]

        public async Task<IActionResult> CreateTenant([FromBody] Tenant createTenant)
        {
            var existsTenants = await GetAllTenants();

            var isContains = existsTenants.FirstOrDefault(x => x.Name == createTenant.Name);

            if (isContains!=null)
            {
                return BadRequest();
            }

            await _tenantsService.AddTenantAsync(createTenant);
            return Ok(createTenant);
        }
    }
}