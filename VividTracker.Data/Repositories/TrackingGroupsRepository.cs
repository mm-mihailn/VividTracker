﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;
using VividTracker.Data.Repositories.Interfaces;

namespace VividTracker.Data.Repositories
{
    public class TrackingGroupsRepository : Repository<TrackingGroup>, ITrackingGroupsRepository
    {
        public TrackingGroupsRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<IEnumerable<TrackingGroup>> GetTrackingGroupsByTenantId(int tenantId)
        {
            return await Entities.Include(t => t.Tenant).Where(t => t.TenantId == tenantId).ToListAsync();
        }
    }
}
