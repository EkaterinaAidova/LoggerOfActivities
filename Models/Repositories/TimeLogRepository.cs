using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Models.Repositories
{
    public class TimeLogRepository: ITimeLogRepository
    {
        string connectionString;
        public TimeLogRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public List<TimeLog> GetTimeLogs()
        {
            List<TimeLog> timeLogs = new List<TimeLog>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                timeLogs = db.Query<TimeLog>("SELECT TaskID, UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime FROM TimeLogs").ToList();
            }
            return timeLogs;
        }
         public List<TimeLog> GetUserTimeLogs(int userID)
         {
             List<TimeLog> timeLogs = new List<TimeLog>();
             using (IDbConnection db = new SqlConnection(connectionString))
             {
                 timeLogs = db.Query<TimeLog>("SELECT TaskID, UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime FROM TimeLogs WHERE UserID = @userID", new { userID }).ToList();
             }
             return timeLogs;
         }
         public List<TimeLog> GetUserLogsWithStatus(int idUser, int status)
         {
             List<TimeLog> timeLogs = new List<TimeLog>();
             using (IDbConnection db = new SqlConnection(connectionString))
             {
                 timeLogs = db.Query<TimeLog>("SELECT TaskID, UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime FROM TimeLogs WHERE UserID= @idUser AND Status= @status ", new { idUser, status }).ToList();
             }
             return timeLogs;
         }
        public TimeLog Get(int id)
        {
            TimeLog timeLog = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                timeLog = db.Query<TimeLog>("SELECT TaskID, UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime FROM TimeLogs WHERE TaskID = @id", new { id }).FirstOrDefault();
            }
            return  timeLog;
        }
        public TimeLog Create(TimeLog timeLog)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO TimeLogs (UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime) VALUES(@UserID, @ProjectID, @ActivityID, @Status, @StartWorkTime, @LastPauseTime, @LastResumeTime, @EndWorkTime, @SpendingTime) OUTPUT INSERTED.ID";
                int? timeLogId = db.Query<int>(sqlQuery, timeLog).FirstOrDefault();
                timeLog.TaskID = timeLogId.Value;
            }
            return timeLog;
        }
        public void Update(TimeLog timeLog)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE TimeLogs SET UserID = @UserID, ProjectID = @ProjectID, ActivityID = @ActivityID, Status = @Status, StartWorkTime = @StartWorkTime, LastPauseTime = @LastPauseTime, LastResumeTime = @LastResumeTime, EndWorkTime = @EndWorkTime, SpendingTime = @SpendingTime  WHERE TaskID = @TaskID";
                db.Execute(sqlQuery, timeLog);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM TimeLogs WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }      
    }
}