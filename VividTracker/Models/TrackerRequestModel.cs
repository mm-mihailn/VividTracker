﻿namespace VividTracker.ViewModels
{
    using Microsoft.AspNetCore.Mvc;
    using System;
    using VividTracker.Business.Services.Interfaces;
    using VividTracker.Data.Models;

    public class TrackerRequestModel
    {
        public string? Name { get; set; }
        public string? Label { get; set; }
        public TrackingGroup ToTrackerModel(int trackingGroupId)
        {
            return  new TrackingGroup()
            {
                Name = Name,
                Label = Label,
                Id = trackingGroupId,
                Tenant = new Tenant()
            };
        }
    }
}
