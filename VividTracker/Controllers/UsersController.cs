namespace VividTracker.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.WebUtilities;
    using System.Text;
    using System.Text.Encodings.Web;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;
    using static Duende.IdentityServer.Models.IdentityResources;

    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUsersService _usersService;
        private readonly IEmailService _emailService;
        private readonly UserManager<User> _userManager;

        public UserController(IUsersService userService, IEmailService emailService, UserManager<User> userManager)
        {
            _usersService = userService;
            _emailService = emailService;
            _userManager = userManager;
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

        [HttpPost]
        [Route("api/create/{tenantId}")]
        public async Task<IActionResult> CreateNewTenantUser([FromRoute] int tenantId, [FromBody]User user)
        {
            var targetUser = _usersService.GetUserByEmail(user.Email);

            if (targetUser != null && targetUser.IsDeleted == true)
            {
                await _usersService.UnDeleteUser(targetUser,tenantId);
                return Ok("User is added again!");
            }
            else if(targetUser != null && targetUser.IsDeleted == false)
            {
                return BadRequest("User already exist!");
            }
            else
            {
                 await _usersService.AddUser(tenantId, user);

                //Sending email
                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
                var identity = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(user.Email));
                var callbackUrl = Url.Page(
                    "/Account/ResetPassword",
                    pageHandler: null,
                    values: new { area = "Identity", code, identity },
                    protocol: Request.Scheme);

                await _emailService.SendEmailAsync(
                    user.Email,
                    "You have been invited to join in VividTraker",
                    $"<h2>You have been invited to join in VividTraker</h2>Click on the link below to complete your registration and join Vividtracker<br>" +
                    $"<a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>Clicking here.</a>");

                return Ok(user);
            }
            
        }
    }   
}
