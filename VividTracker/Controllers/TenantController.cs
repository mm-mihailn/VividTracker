namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections;
    using System.Linq;
    using VividTracker.Data.Models;
    using VividTracker.Data;
    using VividTracker.Data.Repositories.Interfaces;
    using VividTracker.Business.Services.Interfaces;

    
    [ApiController]
    public class TenantsController : ControllerBase
    {
        private readonly ITenantsService _tenantsService;

        public TenantsController(ITenantsService tenantsService)
        {
            _tenantsService = tenantsService;
        }

        [Route("api/getAllTenants")]
        [HttpGet]
        public async Task<List<Tenant>> Get()
        {
            return (List<Tenant>)await _tenantsService.GetTenantsAsync();
        }
       
    }


}