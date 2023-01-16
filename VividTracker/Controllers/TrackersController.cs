using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;


namespace VividTracker.Controllers
{
    [ApiController]
    public class TrackersController : ControllerBase
    {
        private readonly ITrackingGroupsService _trackingGroupsService;
        public TrackersController(ITrackingGroupsService trackingGroupsService)
        {
            _trackingGroupsService = trackingGroupsService;
        }

        [HttpGet]
        [Route("api/trackers/{tenantId}")]
        public async Task<IActionResult> GetTrackingGroupsByTenantId([FromRoute] int tenantId)
        {
            var trackingGroups = await _trackingGroupsService.GetTrackingGroupsByTenantId(tenantId);

            if (!trackingGroups.Any())
            {
                return BadRequest("No exist tracking groups!");
            }
            return Ok(trackingGroups);
        }

        [HttpGet]
        [Route("api/trackers")]
        public async Task<IEnumerable<TrackingGroup>> GetAllTrackers()
        {
            return await _trackingGroupsService.GetTrackersAsync();
        }

        [HttpPost]
        [Route("api/create/tracker")]
        public async Task<IActionResult> CreateTracker([FromBody] TrackingGroup createTracker)
        {
            var tracker = await _trackingGroupsService.GetTrackerByNameAsync(createTracker.Name);

            if (tracker != null)
            {
                return BadRequest("The tracker already exists");
            }

            await _trackingGroupsService.AddTrackerAsync(createTracker);
            return Ok(createTracker);
        }
    }
}
