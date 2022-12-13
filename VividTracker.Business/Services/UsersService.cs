namespace VividTracker.Business.Services
{
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

        public async Task<User> CreateUser(int id,User user)
        {
            var newUser = _userRepository.CreateUser(id, user);
            return await _userRepository.AddAsync(newUser);
        }
    }
}
