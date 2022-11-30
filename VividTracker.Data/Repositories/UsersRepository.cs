﻿namespace VividTracker.Data.Repositories
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
            return await Entities.ToListAsync();
        }
    }
}