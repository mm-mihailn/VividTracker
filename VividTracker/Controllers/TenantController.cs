namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections;
    using System.Linq;
    using VividTracker.Data.Models;
    using VividTracker.Data;

    //[Authorize]

    [Route("api/getAllTenants")]
    [ApiController]
    public class TenantsController : ControllerBase
    {
        ApplicationDbContext db;
        public TenantsController(ApplicationDbContext context)
        {
            this.db = context;
        }
        [HttpGet]
        public List<Tenant> Get()
        {
           return db.Tenants.ToList();
        }
    }


}