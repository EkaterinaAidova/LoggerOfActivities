﻿using System;
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
        ITimeLogRepository repositoryTimeLog;
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
        public WorkWithLogsService(ITimeLogRepository repo, IDefineActivityService activityServ, IDefineProjectService projectServ)
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
            log.StartWorkTime = ignoreSeconds(DateTime.Now);
            log.LastResumeTime = log.StartWorkTime;
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
            loglist.Sort((a, b) =>
            {
                var res = a.Status.CompareTo(b.Status);
                if (res == 0)
                {
                    res = a.StartWorkTime.CompareTo(b.StartWorkTime);
                }
                return res;
            });
            return loglist;
        }
        public void UpdateTimeLog(TimeLogInfo timeLog)
        {
            var log = CreateTimeLog(timeLog);
            repositoryTimeLog.Update(log);
        }
        public bool SetLogOnPauseWithTime(int id, DateTime time)
        {
            time = ignoreSeconds(time);
            var log = repositoryTimeLog.Get(id);
            if (log.IsNull()) return false;
            if (log.Status > 1) return false;
            if (log.LastResumeTime > time) return false;
            if (log.LastResumeTime.IsNull()) log.LastResumeTime = log.StartWorkTime;
            TimeSpan lasting = time - log.LastResumeTime.Value; 
            if (log.SpendingTime.IsNull()) log.SpendingTime = 0;
            log.SpendingTime += lasting.Ticks;
            log.Status = 2;
            log.LastPauseTime = time;
            repositoryTimeLog.Update(log);
            return true;
        }
        public bool FinishWorkWithTime(int id, DateTime time)
        {
            time = ignoreSeconds(time);
            var log = repositoryTimeLog.Get(id);
            if (log.IsNull()) return false;
            switch (log.Status)
            {
                case 1:
                    if (log.LastResumeTime > time) return false;
                    TimeSpan lasting = time - log.LastResumeTime.Value;
                    if (log.SpendingTime.IsNull()) log.SpendingTime = 0;
                    log.SpendingTime += lasting.Ticks;
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
            var activLog = GetUserLogWithStatus(log.UserID, 1);
            if (activLog.Count() != 0)
            {
                SetLogOnPauseWithTime(activLog.First().TaskID, DateTime.Now);
            }
            log.Status = 1;
            log.LastResumeTime = ignoreSeconds(time);
            repositoryTimeLog.Update(log);
        }
        public bool IsLogValid(TimeLogForCreationInfo info)
        {
            var activity = activityService.GetActivity(info.ActivityID);
            if (activity.IsNull()) return false;
            var project = projectService.GetProject(info.ProjectID);
            if (project.IsNull()) return false;
            return true;
        }
        private DateTime ignoreSeconds(DateTime time)
        {
            var seconds = 0;
            seconds = time.Second;
            var milisec = 0;
            milisec = time.Millisecond;
            var ticks = time.Ticks - seconds * 10000000 - milisec * 10000;
            var updatedTime = new DateTime(ticks);
            return updatedTime;
        }
    }
   
}
