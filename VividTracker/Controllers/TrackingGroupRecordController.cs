namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;

    [ApiController]
    public class TrackingGroupRecordController : ControllerBase
    {
        private readonly ITrackingGroupRecordsService _trackingGroupRecordsService;

        public TrackingGroupRecordController(ITrackingGroupRecordsService trackingGroupRecordsService)
        {
            _trackingGroupRecordsService = trackingGroupRecordsService;
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

    }
}
