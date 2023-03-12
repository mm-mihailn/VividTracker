namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Models;

    [ApiController]
    [Authorize]
    public class TrackingGroupRecordController : ControllerBase
    {
        private readonly ITrackingGroupRecordsService _trackingGroupRecordsService;
        private readonly ITrackingGroupsService _trackingGroupsService;
        public TrackingGroupRecordController(ITrackingGroupRecordsService trackingGroupRecordsService, ITrackingGroupsService trackingGroupsService)
        {
            _trackingGroupRecordsService = trackingGroupRecordsService;
            _trackingGroupsService = trackingGroupsService;
        }

        [HttpGet]
        [Route("api/trackingGroupRecords/{trackingGroupId}")]
        public async Task<IActionResult> GetAllRecords([FromRoute] int trackingGroupId)
        {
            var records = await _trackingGroupRecordsService.GetAllRecords(trackingGroupId);

            if (!records.Any())
            {
                return BadRequest("No exist records!");
            }
           return Ok(records);
        }

        [HttpGet]
        [Route("api/trackingGroupsRecordsUnique/{trackingGroupId}")]
        public async Task<IEnumerable<string>> GetAllTrackingGroupsRecords([FromRoute] int trackingGroupId)
        {
            var trackingGroup = await _trackingGroupsService.GetTrackerByIdAsync(trackingGroupId);

            return await _trackingGroupRecordsService.GetAllTrackingGroupsRecordsAsync(trackingGroup.TenantId);
        }
        [HttpPost]
        [Route("api/create/trackingGroupsRecords/{trackingGroupId}")]
        public async Task<IActionResult> CreateTrackingGroupRecords([FromRoute] int trackingGroupId, [FromBody] TrackingGroupRecordsRequestModel trackingGroupRecordsRequestModel)
        {
            var trackingGroup = await _trackingGroupsService.GetTrackingGroupById(trackingGroupId);
            var trackingGroupRecord = trackingGroupRecordsRequestModel.TrackingGroupRecords(trackingGroup);

            var result = await _trackingGroupRecordsService.CreateTrackingGroupRecord(trackingGroupRecord);

            return Ok(result);
        }
    }
}
