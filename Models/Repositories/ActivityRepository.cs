using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;
namespace ActivityLogger.Models.Repositories
{
    public class ActivityRepository: IActivityRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public List<Activity> GetActivities()
        {
            List<Activity> activities = new List<Activity>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                activities = db.Query<Activity>("SELECT * FROM Activity").ToList();
            }
            return activities;
        }
        public Activity Get(int id)
        {
            Activity activity = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                activity = db.Query<Activity>("SELECT * FROM Activity WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return activity;
        }
        public Activity Create(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Activities (Position) VALUES(@Name); SELECT CAST(SCOPE_IDENTITY() as int)";
                int? activityId = db.Query<int>(sqlQuery, activity).FirstOrDefault();
                activity.ID = activityId.Value;
            }
            return activity;
        }
        public void Update(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Activities SET Name = @Name WHERE Id = @Id";
                db.Execute(sqlQuery, activity);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Activities WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}