using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface ILoginingService
    {
         bool IsInsertValid(string insertLogin, string insertPassword);
         LoginAndPassword LogIn(string insertLogin, string insertPassword);

    }
}
