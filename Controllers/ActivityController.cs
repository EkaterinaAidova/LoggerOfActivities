using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.Controllers
{
    public class ActivityController : ApiController
    {
        IDefineActivityService activityService;
        public ActivityController(IDefineActivityService service)
        {
            activityService = service;
        }
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(activityService.GetActivityList());
        }
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var activity = activityService.GetActivity(id);
            if (activity.IsNotNull())
            {
                return Ok(activity);
            }
            return NotFound();
        }


       /* IActivityRepository repository;
        public ActivityController(IActivityRepository rep)
        {
            repository = rep;
        }
        [HttpPost]
        public void Post([FromBody]Activity ourActivity)
        {
            repository.Create(ourActivity);
        }
        [HttpGet]
        public IEnumerable<Activity> Get()
        {
            return repository.GetActivities();
        }
        [HttpGet]
        public Activity Get(int id)
        {
            return repository.Get(id);
        }
        [HttpPut]
        public void Put([FromBody]Activity ourActivity)
        {
            repository.Update(ourActivity);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }*/
    }
}
