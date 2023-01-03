namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    public class TrackersController : Controller
    {
        private readonly ITrackersService _trackersService;
        public TrackersController(ITrackersService trackersService)
        {
            _trackersService = trackersService;
        }

        [HttpPost]
        [Route("api/create")]

        //public async Task<IActionResult> CreateTenant([FromBody] Tenant createTenant)
        //{
        //    var tenant = await _tenantsService.GetTenantByNameAsync(createTenant.Name);

        //    if (tenant != null)
        //    {
        //        return BadRequest("The tenant already exists");
        //    }

        //    await _tenantsService.AddTenantAsync(createTenant);
        //    return Ok(createTenant);
        //}
    }
}
