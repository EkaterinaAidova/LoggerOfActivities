using System.Collections.Generic;

namespace ActivityLogger.Models.Repositories.Contracts
{
    public interface IUserRepository
    {
        List<User> GetUsers();
        User Get(int id);
        User Create(User user);
        void Update(User user);
        void Delete(int id);
    }
}
