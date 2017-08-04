using ActivityLogger.Models;
using AutoMapper;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
using System.Collections.Generic;
using System.Web.Security;
using WebMatrix.WebData;

namespace ActivityLogger.BusinessLogic.Services
{
    public class DefineUserService: IDefineUserService
    {    
         IUserRepository repository;
         public DefineUserService(IUserRepository rep)
        {
            repository = rep;
        }
        public UserInfo GetUser(int id)
         {
             var user = repository.Get(id);
             UserInfo obj = Mapper.Map<User, UserInfo>(user);
             return obj;
         }
        public void DeleteUser(int id)
        {
            var user = GetUser(id);
                ((SimpleMembershipProvider)Membership.Provider).DeleteAccount(user.Email);
               repository.Delete(id);
        }
       public IEnumerable<UserInfo> GetUsers()
        {
            var users = repository.GetUsers();
                return Mapper.Map<IEnumerable<User>, List<UserInfo>>(users);
        }
    }
}