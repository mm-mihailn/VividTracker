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
            var users = await Entities.Where(u=>u.IsDeleted==false).ToListAsync();
            return users;
        }
        public override Task DeleteAsync(User entity)
        {
            entity.IsDeleted = true;
            return Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User?>> GetUsersByTenantId(int id)
        {
            return await Entities.Where(u => u.TenantId == id).ToListAsync();
        }
    }
}
