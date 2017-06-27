using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface ILoginingService
    {
         bool InsertValidation(LoginAndPassword insertData);
         int? GetUserID(LoginAndPassword insertData);
         int LogIn(LoginAndPassword insertData);
    }
}
