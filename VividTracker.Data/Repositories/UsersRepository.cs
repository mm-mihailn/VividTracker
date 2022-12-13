﻿namespace VividTracker.Data.Repositories
{
    using Microsoft.AspNetCore.Identity;
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

        public async Task<IEnumerable<User>> GetUsersByTenantId(int id)
        {
            return await Entities.Where(u => u.TenantId == id && u.IsDeleted==false).ToListAsync();
        }

        public User CreateUser(int id, User user)
        {
            var passwordHasher = new PasswordHasher<User>();
            var newUser = new User
            {
                Id = Guid.NewGuid().ToString(),
                UserName = user.Email,
                NormalizedUserName = user.Email.ToUpper(),
                Email = user.Email,
                NormalizedEmail = user.Email.ToUpper(),
                EmailConfirmed = true,
                LockoutEnabled = false,
                TenantId = id,
                PasswordHash = passwordHasher.HashPassword(user, "Denev123!")
            };
           
            return newUser;
        }
    }
}
