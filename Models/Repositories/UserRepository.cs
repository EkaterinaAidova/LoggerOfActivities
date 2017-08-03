using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data.SqlClient;
using System.Data;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Models.Repositories
{
    public class UserRepository: IUserRepository
    {
        string connectionString;
        public UserRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                users = db.Query<User>("SELECT ID, Name, Email FROM Users").ToList();
            }
            return users;
        }
        public User Get(int id)
        {
            User user = null;
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                user = db.Query<User>("SELECT ID, Name, Email FROM Users WHERE Id = @id", new { id }).FirstOrDefault();
            }
            return user;
        }
        public User Create(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "INSERT INTO Users (Name, Email) VALUES(@Name, @Email) OUTPUT INSERTED.ID";
                int? userId = db.Query<int>(sqlQuery, user).FirstOrDefault();
                user.ID = userId.Value;
            }
            return user;
        }
        public void Update(User user)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "UPDATE Users SET Name = @Name, Email = @Email WHERE Id = @Id";
                db.Execute(sqlQuery, user);
            }
        }
        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(connectionString))
            {
                var sqlQuery = "DELETE FROM Users WHERE Id = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}