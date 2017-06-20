using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace ActivityLogger.Models.Repositories
{
    public class TimeLogsRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
         public List<TimeLog> GetTimeLogs()
        {
            List<TimeLog> timeLogs = new List<TimeLog>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                timeLogs = db.Query<TimeLog>("SELECT * FROM TimeLogs").ToList();
            }
            return timeLogs;
        }
        public TimeLog Get(int id)
        {
            TimeLog timeLog = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                timeLog = db.Query<TimeLog>("SELECT * FROM TimeLogs WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return  timeLog;
        }
        public TimeLog Create(TimeLog timeLog)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO TimeLogs (UserID, ProjectID, ActivityID, Status, StartWorkTime, LastPauseTime, LastResumeTime, EndWorkTime, SpendingTime) VALUES(@UserID, @ProjectID, @ActivityID, @Status, @StartWorkTime, @LastPauseTime, @LastResumeTime, @EndWorkTime, @SpendingTime); SELECT CAST(SCOPE_IDENTITY() as int)";
                int? timeLogId = db.Query<int>(sqlQuery, timeLog).FirstOrDefault();
                timeLog.TaskID = timeLogId.Value;
            }
            return timeLog;
        }
        public void Update(TimeLog timeLog)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE TimeLogs SET UserID = @UserID, ProjectID = @ProjectID, ActivityID = @ActivityID, Status = @Status, StartWorkTime = @StartWorkTime, LastPauseTime = @LastPauseTime, LastResumeTime = @LastResumeTime, EndWorkTime = @EndWorkTime, SpendingTime = @SpendingTime  WHERE Id = @Id";
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
        public List<TimeLog> GetUserTimeLogs(int userID)
        {
            List<TimeLog> timeLogs = new List<TimeLog>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                timeLogs = db.Query<TimeLog>("SELECT * FROM TimeLogs WHERE UserID= @userID").ToList();
            }
            return timeLogs;
        }
    }

}