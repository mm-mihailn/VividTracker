using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VividTracker.Business.Services;
using VividTracker.Business.Services.Interfaces;
using VividTracker.Data.Models;
using VividTracker.Models;

namespace VividTracker.Controllers
{
    [ApiController]

    public class TrackingItemValuesController : ControllerBase
    {
        private readonly ITrackingItemValuesService _trackingItemValuesService;
        public TrackingItemValuesController(ITrackingItemValuesService trackingItemValuesService)
        {
            _trackingItemValuesService=trackingItemValuesService;
        }

        [HttpGet]
        [Route("api/TrackingItemValues/{trackingItemId}")]
        public async Task<IActionResult> GetTrackingItemValues([FromRoute] int trackingItemId)
        {
            var trackingItemValues = await _trackingItemValuesService.GetItemValuesAsync(trackingItemId);

            if (!trackingItemValues.Any())
            {
                return BadRequest("tracking items Values do not exist!");
            }
            return Ok(trackingItemValues);
        }
        [HttpGet]
        [Route("api/TrackingItemValues/{trackingItemId}/{trackingGroupRecordId}")]
        public async Task<IActionResult> GetItemValue([FromRoute] int trackingItemId, [FromRoute] int trackingGroupRecordId)
        {
            var trackingItemValue = await _trackingItemValuesService.GetValueByCoordinatesAsync(trackingGroupRecordId, trackingItemId);

            if (trackingItemValue==null)
            {
                return BadRequest("tracking item Value do not exist!");
            }
            return Ok(trackingItemValue);
        }

        [HttpPost]
        [Route("api/update/{tenantId}/{trackingItemId}")]
        public async Task<IActionResult> AddItemValue([FromRoute] int trackingItemId, [FromRoute] int trackingGroupRecordId, [FromBody] TrackingItemValue trackingItemValueModel)
        {
            var result = await _trackingItemValuesService.AddItemValueAsync(trackingItemValueModel);
            return Ok(result);
        }
    }
}
