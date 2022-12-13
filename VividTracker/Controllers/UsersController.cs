﻿namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UserController(IUsersService userService)
        {
            _usersService = userService;
        }

        [HttpGet]
        [Route("api/users")]
        public async Task<IEnumerable<User>> GetAllUsers()
        {
           return await _usersService.GetUserAsync();
        }

        [HttpGet]
        [Route("api/users/{id}")]
        public async Task<IActionResult> GetUsersByTenantId([FromRoute] int id)
        {
            var users = await _usersService.GetUsersByTenantId(id);
            
            if (!users.Any())
            {
                return NotFound("Users do not exists!");
            }
            return Ok(users);
        }
        [HttpDelete]
        [Route("api/delete/{id}")]

        public async Task<IActionResult> DeleteUser([FromRoute] string id)
        {
            var targetUser = await _usersService.GetUserByIdAsync(id);
            if(targetUser == null)
            {
                return NotFound("User doesn't exists");
            }
            if (targetUser.IsDeleted)
            {
                return BadRequest("User is already deleted");
            }
            await _usersService.DeleteAsync(targetUser);

            return Ok(targetUser);
        }
    }
}
