using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Models.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        string connectionString;
        public ActivityRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public List<Activity> GetActivities()
        {
            List<Activity> activities = new List<Activity>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                activities = db.Query<Activity>("SELECT ID, Position FROM Activities").ToList();
            }
            return activities;
        }
        public Activity Get(int id)
        {
            Activity activity = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                activity = db.Query<Activity>("SELECT ID, Position FROM Activities WHERE ID = @ID", new { id }).FirstOrDefault();
            }
            return activity;
        }
        public Activity Create(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Activities (Position) VALUES(@Position) OUTPUT INSERTED.ID";
                int? activityId = db.Query<int>(sqlQuery, activity).FirstOrDefault();
                activity.ID = activityId.Value;
            }
            return activity;
        }
        public void Update(Activity activity)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Activities SET Position = @Position WHERE ID = @ID";
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