namespace VividTracker.Data.Repositories.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;

    public interface IUserRepository:IRepository<User>
    {
        Task<IEnumerable<User>> GetAllUsers();
    }
}
