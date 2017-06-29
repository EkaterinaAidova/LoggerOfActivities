using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityLogger.Models;
using AutoMapper;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.BusinessLogic.Services
{
    public class DefineActivityService:IDefineActivityService
    {
        IActivityRepository repository;
        public DefineActivityService(IActivityRepository repo)
        {
            repository = repo;
        }
        public IEnumerable<ActivityInfo> GetActivityList()
        {
            var activities = repository.GetActivities();
            return Mapper.Map<IEnumerable<Activity>, List<ActivityInfo>>(activities);
        }
        public ActivityInfo GetActivity(int id)
        {
            return Mapper.Map<Activity, ActivityInfo>(repository.Get(id));
        }
    }
}