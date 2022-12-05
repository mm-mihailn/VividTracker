namespace VividTracker.Data.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using VividTracker.Data.Models;
    using VividTracker.Data.Repositories.Interfaces;

    public class UsersRepository : Repository<User>, IUsersRepository
    {
        public UsersRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            var allUsers = await Entities.ToListAsync();
            var updateUsers = allUsers.Where(i => i.IsDeleted != true);
            return updateUsers;
        }
        public override Task DeleteAsync(User entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            return Context.SaveChangesAsync();
        }
    }
}
