namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;

    [ApiController]
    public class TrackingGroupController : ControllerBase
    {
        private readonly ITrackingGroupService _trackingGroupService;

        public TrackingGroupController(ITrackingGroupService trackingGroupService)
        {
            _trackingGroupService = trackingGroupService;
        }

        [HttpGet]
        [Route("api/trackingGroup/{tenantId}")]
        public async Task<IActionResult> GetAllTrackingGroupByTenantId([FromRoute] int tenantId)
        {
            var result = await _trackingGroupService.GetTrackingGroupsByTenantId(tenantId);

            if (!result.Any())
            {
                return BadRequest("No exist tracking groups!");
            }
           return Ok(result);
        }

    }
}
