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
        public Project Get(int id)
        {
            Project project = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                project = db.Query<Project>("SELECT * FROM Projects WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return project;
        }
        public Project Create(Project project)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Projects (Name) VALUES(@Name); SELECT CAST(SCOPE_IDENTITY() as int)";
                int? projectId = db.Query<int>(sqlQuery, project).FirstOrDefault();
                project.ID = projectId.Value;
            }
            return project;
        }
        public void Update(Project project)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Projects SET Name = @Name WHERE Id = @Id";
                db.Execute(sqlQuery, project);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Projects WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
    }
}