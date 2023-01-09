namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;

    [ApiController]
    public class TrackingItemsController : ControllerBase
    {
        private readonly ITrackingItemsService _trackingItemsService;

        public TrackingItemsController(ITrackingItemsService trackingItemsService)
        {
            _trackingItemsService = trackingItemsService;
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
        [Route("api/trackingItems/add/{tenantId}")]
        public async Task<IActionResult> CreateTrackingItem([FromRoute] int tenantId, [FromBody] TrackingItem trackingItems)
        {
            var result = await _trackingItemsService.AddTrackingItem(tenantId, trackingItems);
            
            return Ok(trackingItems);
        }
    }
}
