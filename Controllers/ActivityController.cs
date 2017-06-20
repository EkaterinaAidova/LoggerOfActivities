using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories.Contracts;
namespace ActivityLogger.Controllers
{
    public class ActivityController : ApiController
    {
        IActivityRepository repository;
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
        }
    }
}
