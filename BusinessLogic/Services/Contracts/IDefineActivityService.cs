using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IDefineActivityService
    {
        IEnumerable<ActivityInfo> GetActivityList();
        ActivityInfo GetActivity(int id);
    }
}
