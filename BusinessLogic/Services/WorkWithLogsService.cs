using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Models;
namespace ActivityLogger.BusinessLogic.Services
{
    public class WorkWithLogsService: IWorkWithLogsService
    {
        ITimeLogsRepository repositoryTimeLog;
        IDefineActivityService activityService;
        IDefineProjectService projectService;
        public WorkWithLogsService(ITimeLogsRepository repo, IDefineActivityService activityServ, IDefineProjectService projectServ)
        {
            repositoryTimeLog = repo;
            activityService = activityServ;
            projectService = projectServ;
        }
        public void AddNewLog()
        { }
        public void SetLogOnPause(int id) { }
        public void FinishWorkLog(int id) { }
        public void RestartWorkLog(int id) { }
        public IEnumerable<TimeLogInfo> ShowLogsList(int userID) {
            var tasks = repositoryTimeLog.GetUserTimeLogs(userID);
            List<TimeLogInfo> loglist = new List<TimeLogInfo>();
            foreach (TimeLog tl in tasks)
            {
                var timeLog = new TimeLogInfo();
                timeLog.TaskID = tl.TaskID;
                timeLog.UserID = tl.UserID;
                timeLog.Status = tl.Status;
                timeLog.StartWorkTime = tl.StartWorkTime;
                timeLog.EndWorkTime = tl.EndWorkTime;
                timeLog.LastPauseTime = tl.LastPauseTime;
                timeLog.LastResumeTime = tl.LastResumeTime;
                timeLog.SpendingTime = tl.SpendingTime;
                timeLog.Project = projectService.GetProject(tl.ProjectID);
                timeLog.Activity = activityService.GetActivity(tl.ActivityID);
                loglist.Add(timeLog);
            }
            return loglist;
        }
        public void SetLogOnPauseWithTime(int id, DateTime time) { }
        public void FinishWorkWithTime(int id, DateTime time) { }
    }
}
