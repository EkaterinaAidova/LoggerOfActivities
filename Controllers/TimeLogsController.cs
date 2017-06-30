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
    public class TimeLogsController : ApiController
    {
        IWorkWithLogsService timeLogService;
        public TimeLogsController(IWorkWithLogsService service)
        {
            timeLogService = service;
        }
        [HttpGet]
        public IHttpActionResult GetUsersLogs(int id)
        {
            Logger.Log.Info(string.Concat("Controller: timeLogs  - list of tasks of user ", id.ToString(), " is recieved"));
            return Ok(timeLogService.ShowLogsList(id));
        }
        [HttpPost]
        public IHttpActionResult Post([FromBody]TimeLogForCreationInfo ourLog)
        {
            if (!timeLogService.IsLogValid(ourLog))
            {
                Logger.Log.Error("Controller: timeLogs - new TimeLog can't be created");
                return BadRequest();
            }
            timeLogService.AddNewLog(ourLog);
            Logger.Log.Info("Controller: timeLogs - new TimeLog is created");
            return Ok();

        }
        [HttpPut]
        public IHttpActionResult Put(int logId, int status, DateTime time)
        {
            switch (status)
            {
                case 1: timeLogService.ResumeWork(logId, time);
                    Logger.Log.Info(String.Concat("Controller: timeLogs - TimeLog ", logId.ToString(), " is updated"));
                    return Ok();
                case 2: var res =timeLogService.SetLogOnPauseWithTime(logId, time);
                    if (res)
                    {
                        Logger.Log.Info(String.Concat("Controller: timeLogs - TimeLog ", logId.ToString()," is updated"));
                        return Ok();
                    }
                    Logger.Log.Error(String.Concat("Controller: timeLogs -  TimeLog", logId.ToString(), "can't be updated"));
                    return BadRequest();
                case 3:  res = timeLogService.FinishWorkWithTime(logId, time);
                    if (res)
                    {
                        Logger.Log.Info(String.Concat("Controller: timeLogs - TimeLog ", logId.ToString(), " is updated"));
                        return Ok();
                    }
                    Logger.Log.Error(String.Concat("Controller: timeLogs -  TimeLog", logId.ToString(), "can't be updated"));
                    return BadRequest();
                default:
                    Logger.Log.Error(String.Concat("Controller: timeLogs -  TimeLog", logId.ToString(), "can't be updated"));
                    return BadRequest();
            }
        }
        
       /* ITimeLogsRepository repository;
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
        [HttpGet]
        public TimeLog Get(int id)
        {
            return repository.Get(id);
        }
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
        }*/

    }
}