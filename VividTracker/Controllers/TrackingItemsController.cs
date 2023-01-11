namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Models;

    [ApiController]
    public class TrackingItemsController : ControllerBase
    {
        private readonly ITrackingItemsService _trackingItemsService;
        private readonly ITenantsService _tenantsService;
        public TrackingItemsController(ITrackingItemsService trackingItemsService, ITenantsService tenantsService)
        {
            _trackingItemsService = trackingItemsService;
            _tenantsService = tenantsService;
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
        [Route("api/trackingItems/create/{tenantId}")]
        public async Task<IActionResult> CreateTrackingItem([FromRoute] int tenantId, [FromBody] TrackingItemRequestModel trackingItemRequestModel)
        {
            var tenant = await _tenantsService.GetTenantByIdAsync(tenantId);
            var trackingItem = trackingItemRequestModel.ToCreateTrackingItem(tenantId,tenant);

            var result = await _trackingItemsService.AddTrackingItem(trackingItem);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Already exist!");
        }
    }
}
