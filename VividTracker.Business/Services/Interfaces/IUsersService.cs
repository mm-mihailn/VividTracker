namespace VividTracker.Business.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface IUsersService
    {
        Task<IEnumerable<User>> GetUserAsync();
        Task DeleteAsync(User user);
        Task<User?> GetUserByIdAsync(string id);
        Task<IEnumerable<User>> GetUsersByTenantId(int id);
        Task<User> AddUser(int tenantId,User user);
        User GetUserByEmail(string email,int tenantId);
    }
}
