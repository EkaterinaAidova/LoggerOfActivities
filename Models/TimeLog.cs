using System;

namespace ActivityLogger.Models
{
    public class TimeLog
    {
        public int TaskID { get; set;}
        public int UserID {get; set;}
        public int ProjectID { get; set;}
        public int ActivityID { get; set;}
        public int Status { get; set;}
        public DateTime StartWorkTime { get; set;}
        public DateTime? LastPauseTime { get; set;}
        public DateTime? LastResumeTime { get; set;}
        public DateTime? EndWorkTime { get; set;}
        public DateTime? SpendingTime { get; set; }
    }
}