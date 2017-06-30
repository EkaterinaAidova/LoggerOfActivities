using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using System.Web.Http;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface ILoginingService
    {
         bool IsInsertValid(string insertLogin, string insertPassword);
        // int? GetUserID(LoginAndPassword insertData);
         LoginAndPassword LogIn(string insertLogin, string insertPassword);

    }
}
