using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IDefineUserService
    {
        UserInfo GetUser(int id);
    }
}
