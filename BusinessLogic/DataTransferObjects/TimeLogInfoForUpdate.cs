using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class TimeLogInfoForUpdate
    {
       public  int LogId { get; set; }
       public  int Status { get; set; }
       public DateTime Date { get; set; }
    }
}