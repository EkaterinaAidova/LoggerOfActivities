using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Dapper;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.Models.Repositories;
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
                activities = db.Query<Activity>("SELECT ID, Position FROM Activity").ToList();
            }
            return activities;
        }
        public Activity Get(int id)
        {
            Activity activity = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                activity = db.Query<Activity>("SELECT ID, Position FROM Activity WHERE ID = @ID", new { id }).FirstOrDefault();
            }
            return activity;
        }
        public Activity Create(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Activity (Position) VALUES(@Position) OUTPUT INSERTED.ID";
                int? activityId = db.Query<int>(sqlQuery, activity).FirstOrDefault();
                activity.ID = activityId.Value;
            }
            return activity;
        }
        public void Update(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Activity SET Position = @Position WHERE ID = @ID";
                db.Execute(sqlQuery, activity);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Activity WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}