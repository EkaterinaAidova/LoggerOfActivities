using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityLogger.Models.Repositories.Contracts
{
    interface IUserRepository
    {
        List<User> GetUsers();
        User Get(int id);
        User Create(User user);
        void Update(User user);
        void Delete(int id);
    }
}
