﻿using System.Linq;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;

namespace ActivityLogger.Controllers
{
    [RoutePrefix("api/activity")]
    public class ActivityController : ApiController
    {
        IDefineActivityService activityService;
        public ActivityController(IDefineActivityService service)
        {
            activityService = service;
        }
        [Authorize]
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            Logger.Log.Info("Controller: activity - Activities' list is received");
            return Ok(activityService.GetActivityList());
        }
        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public IHttpActionResult Get(int id)
        {
            var activity = activityService.GetActivity(id);
            if (activity.IsNotNull())
            {
                Logger.Log.Info(string.Concat("Controller: activity  - info about activity ", id.ToString(), " is recieved"));
                return Ok(activity);
            }
            Logger.Log.Error("Controller: activity  - Activity is not found.");
            return NotFound();
        }
    }
}
