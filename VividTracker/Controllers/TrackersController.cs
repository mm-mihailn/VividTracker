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
    }
}
