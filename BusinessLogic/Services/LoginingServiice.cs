using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.BusinessLogic.Services
{
    public class LoginingServiice: ILoginingService
    {
        IAutorisationRepository repository;
        public LoginingServiice(IAutorisationRepository rep)
        {
            repository = rep;
        }
        public bool InsertValidation(LoginAndPassword insertData)
        {
            return (insertData.Login != null && insertData.Password != null);
        }

        public int? GetUserID(LoginAndPassword insertData)
        {
            var autorisationData = repository.Get(insertData.Login, insertData.Password);
            if (autorisationData == null) return null;
            return autorisationData.ID;
        }
        public int LogIn(LoginAndPassword insertData)
        {
            if (InsertValidation(insertData))
            {
               var id = GetUserID(insertData);
               if (id.IsNotNull())
               {
                   return id.Value;
               }
               throw new KeyNotFoundException("User not found");
            }
            throw new HttpRequestValidationException("Invalid input for log on");
        }
    }
}