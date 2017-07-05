using System;
namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class TimeLogInfo
    {
        public int TaskID { get; set; }
        public int UserID { get; set; }
        public ProjectInfo Project{ get; set; }
        public ActivityInfo Activity{ get; set; }
        public int Status { get; set; }
        public DateTime StartWorkTime { get; set; }
        public DateTime LastPauseTime { get; set; }
        public DateTime LastResumeTime { get; set; }
        public DateTime EndWorkTime { get; set; }
        public DateTime SpendingTime { get; set; }
    }
}