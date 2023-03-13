namespace VividTracker.Business.Services
{
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _userRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UsersService(IUsersRepository userRepository, IHttpContextAccessor httpContextAccessor)
        {
            _userRepository = userRepository;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<IEnumerable<User>> GetUserAsync()
        {
            return await _userRepository.GetAllUsers();
        }
        public async Task<string> GetCurrentUserId()
        {
            if (_httpContextAccessor.HttpContext.User.Identity != null)
            {
                var claimsIdentity = (ClaimsIdentity)_httpContextAccessor.HttpContext.User.Identity;
                var nameIdentifierClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
                var userId = nameIdentifierClaim != null ? nameIdentifierClaim.Value : "";
                return userId;
            }
            return null;
           // return await _userRepository.GetAllUsers();
        }

        public  Task DeleteAsync(User user)
        {
            return _userRepository.DeleteAsync(user);
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _userRepository.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetUsersByTenantId(int id)
        {
            return await _userRepository.GetUsersByTenantId(id);
        }

        public async Task<User> AddUser(int tenantId, User user)
        {
             user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = user.Email,
                UserName = user.Email,
                NormalizedUserName = user.Email.ToUpper(),
                NormalizedEmail = user.Email.ToUpper(),
                EmailConfirmed = true,
                LockoutEnabled = false,
                TenantId = tenantId,
             };
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, "V!v!dTr@ck3r");
            return await _userRepository.AddAsync(user);
        }

        public User GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }

        public async Task UnDeleteUser(User user,int tenantId)
        {
            user.IsDeleted = false;
            user.TenantId = tenantId;
            await _userRepository.UpdateAsync(user);
        }

        public async Task<int?> GetTenantIdByUserId(string userId)
        {
            var result =  await _userRepository.FindAsync(userId);
            return result?.TenantId;
        }

        public async Task<string> GetNameByUserId(string userId) => await _userRepository.GetNameByUserId(userId);

    }
}
