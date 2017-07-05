using System.Linq;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Models;
using AutoMapper;
namespace ActivityLogger.BusinessLogic.Services
{
    public class LoginingServiice: ILoginingService
    {
        IAutorizationRepository repository;
        public LoginingServiice(IAutorizationRepository rep)
        {
            repository = rep;
        }
        public bool IsInsertValid(string insertLogin, string insertPassword)
        {
            return (insertLogin.IsNotNull() && insertPassword.IsNotNull());
        }
        public LoginAndPassword LogIn(string insertLogin, string insertPassword)
        {
            var loginInfo = repository.Get(insertLogin, insertPassword);
            LoginAndPassword obj = Mapper.Map<Autorization, LoginAndPassword>(loginInfo);
            return obj;
        }
    }
}