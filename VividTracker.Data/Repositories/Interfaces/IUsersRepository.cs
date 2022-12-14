namespace VividTracker.Data.Repositories.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface IUsersRepository:IRepository<User>
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<IEnumerable<User>> GetUsersByTenantId(int id);
        User GetUserByEmail(string email,int tenantId);
    }
}
