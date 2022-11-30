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
        private readonly IUsersRepository _userRepository;

        public UserController(IUsersRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsers();
            var updateUsers = users.Where(i => i.IsDelete != true);
            return updateUsers;
        }
        [HttpGet]
        [Route("api/delete/{id}")]

        public async Task<IActionResult> UpdateUsersDelete([FromRoute] string id)
        {
            var users = await GetAllUsers();
            var targetUser = users.FirstOrDefault(x => x.Id == id);
            if(targetUser == null)
            {
                return NotFound();
            }
            if (targetUser.IsDelete)
            {
                return BadRequest();
            }

            targetUser.IsDelete = true;
            await _userRepository.SoftDeleteAsync(targetUser);

            return Ok(targetUser);
        }
    }
}
