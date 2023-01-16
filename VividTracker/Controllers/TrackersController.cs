using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VividTracker.Business.Services;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.ViewModels;

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
        [HttpPatch]
        [Route("api/trackingGroup/edit/{trackingGroupId}")]
        public async Task<IActionResult> EditTrackingGroupName([FromRoute] int trackingGroupId, [FromBody] TrackerRequestModel trackerRequestModel)
        {
            var tracker = trackerRequestModel.ToTrackerModel(trackingGroupId);
            var result =  await _trackingGroupsService.UpdateTrackingGroupName(tracker);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Error!");
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
