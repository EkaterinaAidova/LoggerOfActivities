using System.Collections.Generic;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IDefineActivityService
    {
        IEnumerable<ActivityInfo> GetActivityList();
        ActivityInfo GetActivity(int id);
    }
}
