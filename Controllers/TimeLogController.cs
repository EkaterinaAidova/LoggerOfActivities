using System;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.Controllers
{
    public class TimeLogController : ApiController
    {
        IWorkWithLogsService timeLogService;
        public TimeLogController(IWorkWithLogsService service)
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
                case 1:
                    timeLogService.ResumeWork(logId, time);
                    Logger.Log.Info(String.Concat("Controller: timeLogs - TimeLog ", logId.ToString(), " is updated"));
                    return Ok();
                case 2:
                    var res = timeLogService.SetLogOnPauseWithTime(logId, time);
                    if (res)
                    {
                        Logger.Log.Info(String.Concat("Controller: timeLogs - TimeLog ", logId.ToString(), " is updated"));
                        return Ok();
                    }
                    Logger.Log.Error(String.Concat("Controller: timeLogs -  TimeLog", logId.ToString(), "can't be updated"));
                    return BadRequest();
                case 3:
                    res = timeLogService.FinishWorkWithTime(logId, time);
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
    }
}