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
    public class AutorisationRepository
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public List<Autorisation> GetAutorisationList()
        {
            List<Autorisation> autorisationList = new List<Autorisation>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisationList = db.Query<Autorisation>("SELECT * FROM Autorisation").ToList();
            }
            return autorisationList;
        }
        public Autorisation Get(string login, string password)
        {
            Autorisation autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorisation>("SELECT * FROM Autorisation WHERE Login = @login, Password = @password", new { login, password}).FirstOrDefault();
            }
            return autorisation;
        }
        public Autorisation Get(int id)
        {
            Autorisation autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorisation>("SELECT * FROM Autorisation WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return autorisation;
        }

        public Autorisation Create(Autorisation autorisation)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Autorisation (Position) VALUES(@Name); SELECT CAST(SCOPE_IDENTITY() as int)";
                int? autorisationId = db.Query<int>(sqlQuery, autorisation).FirstOrDefault();
                autorisation.ID = autorisationId.Value;
            }
            return autorisation;
        }
        public void Update(Autorisation autorisation)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Autorisation SET Name = @Name WHERE Id = @Id";
                db.Execute(sqlQuery, autorisation);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Autorisation WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}