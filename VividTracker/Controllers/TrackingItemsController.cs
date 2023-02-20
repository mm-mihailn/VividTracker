namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Models;

    [ApiController]
    [Authorize]
    public class TrackingItemsController : ControllerBase
    {
        private readonly ITrackingItemsService _trackingItemsService;
        private readonly ITenantsService _tenantsService;
        private readonly ITrackingGroupsService _trackingGroupsService;
        public TrackingItemsController(ITrackingItemsService trackingItemsService, ITenantsService tenantsService, ITrackingGroupsService trackingGroupsService)
        {
            _trackingItemsService = trackingItemsService;
            _tenantsService = tenantsService;
            _trackingGroupsService = trackingGroupsService;
        }

        [HttpGet]
        [Route("api/trackingItems/{tenantId}")]
        public async Task<IActionResult> GetAllTrackingItems([FromRoute] int tenantId)
        {
            var trackingItems = await _trackingItemsService.GetTrackingItemsByTenantId(tenantId);

            if (!trackingItems.Any())
            {
                return BadRequest("No exist tracking items!");
            }
           return Ok(trackingItems);
        }
        [HttpPost]
        [Route("api/trackingItems/create/{tenantId}/{trackingGroupId}")]
        public async Task<IActionResult> CreateTrackingItem([FromRoute] int tenantId, int trackingGroupId, [FromBody] TrackingItemRequestModel trackingItemRequestModel)
        {
            var tenant = await _tenantsService.GetTenantByIdAsync(tenantId);
            var trackingGroup = await _trackingGroupsService.GetTrackingGroupById(trackingGroupId);

            var trackingItem = trackingItemRequestModel.ToCreateTrackingItem(tenantId, tenant);

            trackingItem.TrackingGroups.Add(trackingGroup);

            var result = await _trackingItemsService.AddTrackingItem(trackingItem,trackingGroupId);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Already exist!");
        }
        [HttpPatch]
        [Route("api/trackingItems/update/{tenantId}/{trackingItemId}")]
        public async Task<IActionResult> UpdateTrackingName([FromRoute] int tenantId, [FromRoute] int trackingItemId, [FromBody] TrackingItemRequestModel trackingItemRequestModel)
        {
            var tenant = await _tenantsService.GetTenantByIdAsync(tenantId);
            var trackingItem = trackingItemRequestModel.GetTrackingItem(trackingItemId,tenant);
            var result = await _trackingItemsService.UpdateTrackingGroupName(trackingItem);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Error!");
        }
        [HttpGet]
        [Route("api/getTrackingItem/{trackingItemId}")]
        public async Task<IActionResult> GetTrackingItemById([FromRoute] int trackingItemId)
        {
            var result = await _trackingItemsService.GetTrackingItemById(trackingItemId);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }
        [HttpGet]
        [Route("api/getTrackingItemByTrackingGroupId/{trackingGroupId}")]
        public async Task<IActionResult> GetTrackingItemByTrackingGroupId([FromRoute] int trackingGroupId)
        {
            var result = await _trackingItemsService.GetTrackingItemsByTrackingGroupId(trackingGroupId);

            if (result != null)
            {
                return Ok(result);
            }

            return BadRequest();
        }
    }
}
