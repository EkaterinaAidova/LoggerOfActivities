using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Results;
using ActivityLogger.Models;
using AutoMapper;
namespace ActivityLogger.BusinessLogic.Services
{
    public class LoginingServiice: ILoginingService
    {
        IAutorisationRepository repository;
        public LoginingServiice(IAutorisationRepository rep)
        {
            repository = rep;
        }
        public bool IsInsertValid(string insertLogin, string insertPassword)
        {
            return (insertLogin.IsNotNull() && insertPassword.IsNotNull());
        }

       /* public int? GetUserID(LoginAndPassword insertData)
        {
            var autorisationData = repository.Get(insertData.Login, insertData.Password);
            if (autorisationData == null) return null;
            return autorisationData.ID;
        }*/
        public LoginAndPassword LogIn(string insertLogin, string insertPassword)
        {
            var loginInfo = repository.Get(insertLogin, insertPassword);
            LoginAndPassword obj = Mapper.Map<Autorisation, LoginAndPassword>(loginInfo);
            return obj;
              // throw new KeyNotFoundException("User not found");
            //}
           // throw new HttpRequestValidationException("Invalid input for log on");
        }
    }
}