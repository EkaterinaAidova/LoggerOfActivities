using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories;
namespace ActivityLogger.Controllers
{
    public class ActivityController : ApiController
    {
        ActivityRepository repository = new ActivityRepository();
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
