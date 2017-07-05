using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Models.Repositories
{
    public class AutorizationRepository: IAutorizationRepository
    {
        string connectionString;
        public AutorizationRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        private List<Autorization> GetAutorisationList()
        {
            List<Autorization> autorisationList = new List<Autorization>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisationList = db.Query<Autorization>("SELECT ID, Login, Password  FROM Autorisation").ToList();
            }
            return autorisationList;
        }
        public Autorization Get(string login, string password)
        {
            Autorization autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorization>("SELECT ID, Login, Password FROM Autorisation WHERE Login = @login AND Password = @password", new { login, password}).FirstOrDefault();
            }
            return autorisation;
        }
        public Autorization Get(int id)
        {
            Autorization autorisation = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                autorisation = db.Query<Autorization>("SELECT ID, Login, Password  FROM Autorisation WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return autorisation;
        }
        private Autorization Create(Autorization autorisation)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Autorisation (Position) VALUES(@Name) OUTPUT INSERTED.ID";
                int? autorisationId = db.Query<int>(sqlQuery, autorisation).FirstOrDefault();
                autorisation.ID = autorisationId.Value;
            }
            return autorisation;
        }
        public void Update(Autorization autorization)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Autorisation SET Name = @Name WHERE Id = @Id";
                db.Execute(sqlQuery, autorization);
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