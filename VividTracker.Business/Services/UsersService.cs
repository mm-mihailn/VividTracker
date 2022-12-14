namespace VividTracker.Business.Services
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _userRepository;

        public UsersService(IUsersRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<User>> GetUserAsync()
        {
            return await _userRepository.GetAllUsers();
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
                UserName = user.Email,
                NormalizedUserName = user.Email.ToUpper(),
                Email = user.Email,
                NormalizedEmail = user.Email.ToUpper(),
                EmailConfirmed = true,
                LockoutEnabled = false,
                TenantId=tenantId,
            };
            var passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, "V!v!dTr@ck3r");
            return await _userRepository.AddAsync(user);
        }

        public User GetUserByEmail(string email)
        {
            return _userRepository.GetUserByEmail(email);
        }
    }
}
