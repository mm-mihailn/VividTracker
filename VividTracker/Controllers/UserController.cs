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
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetAllTenants()
        {
            return await _userRepository.GetAllUsers();
        }
    }
}
