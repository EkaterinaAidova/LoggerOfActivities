using System;
using System.Collections.Generic;
using System.Linq;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Models;
using AutoMapper;

namespace ActivityLogger.BusinessLogic.Services
{
    public class WorkWithLogsService : IWorkWithLogsService
    {
        ITimeLogsRepository repositoryTimeLog;
        IDefineActivityService activityService;
        IDefineProjectService projectService;
        public IEnumerable<TimeLogInfo> GetUserLogWithStatus(int idUser, int status)
        {
            var tasks = repositoryTimeLog.GetUserLogsWithStatus(idUser, status); ;
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
        public WorkWithLogsService(ITimeLogsRepository repo, IDefineActivityService activityServ, IDefineProjectService projectServ)
        {
            repositoryTimeLog = repo;
            activityService = activityServ;
            projectService = projectServ;
        }
        public void AddNewLog(TimeLogForCreationInfo newLog)
        {
            var activLog = GetUserLogWithStatus(newLog.UserID, 1);
            if (activLog.Count() != 0)
            {
                SetLogOnPauseWithTime(activLog.First().TaskID, DateTime.Now);
            }
            TimeLog log = Mapper.Map<TimeLogForCreationInfo, TimeLog>(newLog);
            log.Status = 1;
            log.StartWorkTime = DateTime.Now;
            log.LastResumeTime = DateTime.Now;
            repositoryTimeLog.Create(log);
        }
        public IEnumerable<TimeLogInfo> ShowLogsList(int userID)
        {
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
        public void UpdateTimeLog(TimeLogInfo timeLog)
        {
            var log = CreateTimeLog(timeLog);
            repositoryTimeLog.Update(log);
        }
        public bool SetLogOnPauseWithTime(int id, DateTime time)
        {
            var log = repositoryTimeLog.Get(id);
            if (log.IsNull()) return false;
            if (log.Status > 1) return false;
            if (log.LastResumeTime > time) return false;
            TimeSpan lasting = time - log.LastResumeTime;
            log.SpendingTime += lasting;
            log.Status = 2;
            log.LastPauseTime = time;
            repositoryTimeLog.Update(log);
            return true;
        }
        public bool FinishWorkWithTime(int id, DateTime time)
        {
            var log = repositoryTimeLog.Get(id);
            if (log.IsNull()) return false;
            switch (log.Status)
            {
                case 1:
                    if (log.LastResumeTime > time) return false;
                    TimeSpan lasting = time - log.LastResumeTime;
                    log.SpendingTime += lasting;
                    log.Status = 3;
                    log.EndWorkTime = time;
                    break;
                case 2:
                    if (log.LastPauseTime > time) return false;
                    log.Status = 3;
                    log.EndWorkTime = time;
                    break;
                default: return false;
            }
            repositoryTimeLog.Update(log);
            return true;
        }
        public TimeLog CreateTimeLog(TimeLogInfo timeLog)
        {
            TimeLog log = new TimeLog();
            log.TaskID = timeLog.TaskID;
            log.UserID = timeLog.UserID;
            log.ProjectID = timeLog.Project.ID;
            log.ActivityID = timeLog.Activity.ID;
            log.Status = timeLog.Status;
            log.StartWorkTime = timeLog.StartWorkTime;
            log.LastResumeTime = timeLog.LastResumeTime;
            log.LastPauseTime = timeLog.LastPauseTime;
            log.EndWorkTime = timeLog.EndWorkTime;
            return log;
        }
        public void ResumeWork(int id, DateTime time)
        {
            var log = repositoryTimeLog.Get(id);
            if (log.IsNull()) return;
            log.Status = 1;
            log.LastResumeTime = time;
            repositoryTimeLog.Update(log);
        }
        public bool IsLogValid(TimeLogForCreationInfo info)
        {
            var activity = activityService.GetActivity(info.Activity);
            if (activity.IsNull()) return false;
            var project = projectService.GetProject(info.Project);
            if (project.IsNull()) return false;
            return true;
        }
    }
}
