using Microsoft.AspNetCore.Authorization;

namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Models;

    [ApiController]
    [Authorize]
    public class TrackingItemValueActivityController : ControllerBase
    {
        private readonly ITrackingItemValueActivityService _trackingItemValueActivityService;
        private readonly IUsersService _usersService;
        public TrackingItemValueActivityController(ITrackingItemValueActivityService trackingItemValueActivityService, IUsersService usersService)
        {
            _trackingItemValueActivityService = trackingItemValueActivityService;
            _usersService = usersService;
        }


        [HttpGet]
        [Route("api/comments/{trackingItemValueId}")]
        public async Task<IActionResult> GetAllCommentsByTrackingItemValueId([FromRoute] int trackingItemValueId)
        {
            var comments = await _trackingItemValueActivityService.GetCommentsByTrackingItemId(trackingItemValueId);

            if (comments == null)
            {
                return BadRequest("No comments!");
            }
            return Ok(comments);

        }

        [HttpPost]
        [Route("api/create/comments/{trackingItemId}")]
        public async Task<IActionResult> CreateComment([FromRoute] int trackingItemId, TrackingItemValueActivityModel trackingItemValueActivityModel)
        {
            var comment = trackingItemValueActivityModel.ToCreateComment(trackingItemId);
            var isExist = await _usersService.GetUserByIdAsync(comment.UserId);

            if (isExist != null)
            {
                if (comment != null)
                {
                    await _trackingItemValueActivityService.AddComment(comment);

                    return Ok("Added Successfully");
                }
                else
                {
                    return BadRequest("Failed");
                }
            }
            else
            {
                return BadRequest("Invalid user Id");
            }
        }
    }
}