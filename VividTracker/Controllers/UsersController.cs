namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _userservice;

        public UserController(IUsersService userservice)
        {
            _userservice = userservice;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
           return await _userservice.GetUserAsync();
        }

        [HttpGet]
        [Route("api/users/{id}")]
        public async Task<IActionResult> GetUsersByTenantId([FromRoute] int id)
        {
            var users = await _userservice.GetUsersByTenantId(id);

            if (users == null)
            {
                return NotFound("Users do not exists!");
            }
            return Ok(users);
        }
        [HttpDelete]
        [Route("api/delete/{id}")]

        public async Task<IActionResult> UsersSoftDelete([FromRoute] string id)
        {
            var targetUser = await  _userservice.GetUserByIdAsync(id);
            if(targetUser == null)
            {
                return NotFound("User does't exists");
            }
            if (targetUser.IsDeleted)
            {
                return BadRequest("User is already deleted");
            }
            await _userservice.DeleteAsync(targetUser);

            return Ok(targetUser);
        }
    }
}
