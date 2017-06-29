using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IWorkWithLogsService
    {
        void AddNewLog();
        void SetLogOnPause(int id);
        void FinishWorkLog(int id);
        void RestartWorkLog(int id);
        IEnumerable<TimeLogInfo> ShowLogsList(int userID);
        void SetLogOnPauseWithTime(int id, DateTime time);
        void FinishWorkWithTime(int id, DateTime time);
    }
}
