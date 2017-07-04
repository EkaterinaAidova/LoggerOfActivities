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
    public class AutorisationRepository: IAutorisationRepository
    {
        string connectionString;//= ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public AutorisationRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        private List<Autorisation> GetAutorisationList()
        {
            List<Autorisation> autorisationList = new List<Autorisation>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisationList = db.Query<Autorisation>("SELECT ID, Login, Password  FROM Autorisation").ToList();
            }
            return autorisationList;
        }
        public Autorisation Get(string login, string password)
        {
            Autorisation autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorisation>("SELECT ID, Login, Password FROM Autorisation WHERE Login = @login AND Password = @password", new { login, password}).FirstOrDefault();
            }
            return autorisation;
        }
        public Autorisation Get(int id)
        {
            Autorisation autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorisation>("SELECT ID, Login, Password  FROM Autorisation WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return autorisation;
        }

        private Autorisation Create(Autorisation autorisation)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Autorisation (Position) VALUES(@Name) OUTPUT INSERTED.ID";
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
        private void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Autorisation WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}