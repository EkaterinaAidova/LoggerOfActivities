using ActivityLogger.BusinessLogic.DataTransferObjects;
using System.Collections.Generic;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IDefineUserService
    {
        UserInfo GetUser(int id);
        void DeleteUser(int id);
        IEnumerable<UserInfo> GetUsers();
    }

}
