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
    public class TimeLogsController : ApiController
    {
        ITimeLogsRepository repository;
        public TimeLogsController(ITimeLogsRepository rep)
        {
            repository = rep;
        }
        [HttpPost]
        public void Post([FromBody]TimeLog ourLog)
        {
            repository.Create(ourLog);
        }
        [HttpGet]
        public IEnumerable<TimeLog> Get()
        {
            return repository.GetTimeLogs();
        }
        [HttpGet]
        public IEnumerable<TimeLog> Get(int idUser, int status)
        {
            return repository.GetUserLogsWithStatus(idUser, status);
        }
          
       /*
        [HttpGet]
        public TimeLog Get(int id)
        {
            return repository.Get(id);
        }*/
        [HttpGet]
        public IEnumerable<TimeLog> GetUsersLogs(int id)
        {
            return repository.GetUserTimeLogs(id);
        }
        [HttpPut]
        public void Put([FromBody]TimeLog ourLog)
        {
            repository.Update(ourLog);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}