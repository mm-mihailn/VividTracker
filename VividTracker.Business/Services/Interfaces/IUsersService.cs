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
        Task<User?> DeleteAsync(User user);
    }
}
