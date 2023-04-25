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
    [Authorize]
    public class TrackingItemValuesController : ControllerBase
    {
        private readonly ITrackingItemValuesService _trackingItemValuesService;
        private readonly ITrackingItemsService _trackingItemsService;
        private readonly ITrackingGroupRecordsService _trackingGroupRecordsService;
        private readonly ITrackingGroupsService _trackingGroupsService;
        public TrackingItemValuesController(ITrackingItemValuesService trackingItemValuesService, ITrackingItemsService trackingItemsService, ITrackingGroupRecordsService trackingGroupsService, ITrackingGroupsService trackingGroupService)
        {
            _trackingItemValuesService = trackingItemValuesService;
            _trackingItemsService = trackingItemsService;
            _trackingGroupRecordsService = trackingGroupsService;
            _trackingGroupsService = trackingGroupService;
        }

        [HttpPost]
        [Route("api/TrackingItemValues/update/{trackingGroupId}/{trackingItemId}/{trackingGroupRecordId}")]
        public async Task<IActionResult> AddItemValue([FromRoute] int trackingItemId, [FromRoute] int trackingGroupRecordId, [FromRoute] int trackingGroupId, [FromBody] TrackingItemValuesModel trackingItemValueModel)
        {
            var trackingItem = await _trackingItemsService.GetTrackingItemById(trackingItemId);
            var trackingGroupRecords = await _trackingGroupRecordsService.GetTrackingGroupRecordById(trackingGroupRecordId);
            var trackingGroup = await _trackingGroupsService.GetTrackerByIdAsync(trackingGroupId);

            if (trackingItem == null || trackingGroupRecords == null || trackingGroup == null)
            {
                return BadRequest("Entity not found!");
            }

            var trackingItemValue = trackingItemValueModel.ToTrackingItemValue(trackingItemId, trackingGroupRecordId,
                trackingItem, trackingGroupRecords);

            if (trackingItemValue == null)
            {
                return BadRequest("Null references type");
            }

            var result = await _trackingItemValuesService.AddItemValueAsync(trackingItemValue);

            return result == null ? BadRequest("Data is not valid!") : Ok(result);
        }

        [HttpGet]
        [Route("api/trackingItemValueById/{trackingItemValueId}")]

        public async Task<IActionResult> GetTrackingItemValueById([FromRoute] int trackingItemValueId)
        {
            var result =  await _trackingItemValuesService.GetTrackingItemValueById(trackingItemValueId);

            if (result == null)
            {
                return BadRequest("Not found!");
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("api/trackingItemValue/trackingItem/{trackingGroupId}")]

        public async Task<IActionResult> GetTrackingItemByTrackingGroupId([FromRoute] int trackingGroupId)
        {
            var result = await _trackingItemValuesService.GetAllValuesByTrackingGroupId(trackingGroupId);

            if (result == null)
            {
                return BadRequest("Not found!");
            }
            return Ok(result);
        }
    }
}