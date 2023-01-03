using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VividTracker.Data.Models;

namespace VividTracker.Business.Services.Interfaces
{
    internal interface ITrackersService
    {
        Task<Tracker?> GetTenantByNameAsync(string name);
    }
}
