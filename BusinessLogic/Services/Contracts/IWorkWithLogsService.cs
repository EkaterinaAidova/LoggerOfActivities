using System;
using System.Collections.Generic;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Models;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IWorkWithLogsService
    {
        void AddNewLog(TimeLogForCreationInfo info);
        IEnumerable<TimeLogInfo> ShowLogsList(int userID);
        bool SetLogOnPauseWithTime(int id, DateTime time);
        bool FinishWorkWithTime(int id, DateTime time);
        void ResumeWork(int id, DateTime time);
        IEnumerable<TimeLogInfo> GetUserLogWithStatus(int idUser, int status);
        void UpdateTimeLog(TimeLogInfo timeLog);
        TimeLog CreateTimeLog(TimeLogInfo timeLog);
        bool IsLogValid(TimeLogForCreationInfo info);
    }
}
