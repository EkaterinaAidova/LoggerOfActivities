using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogicLayer.Services.Contracts;

namespace ActivityLogger.Models.Services
{
    public class WorkWithLogsService: IWorkWithLogsService
    {
      public  void AddNewLog();
      public void SetLogOnPause(int id);
      public void FinishWorkLog(int id);
      public void RestartWorkLog(int id);
      public void ShowLogsList(int userID);
      public void SetLogOnPauseWithTime(int id, DateTime time);
      public void FinishWorkWithTime(int id, DateTime time);
    }
}
