using ActivityLogger.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
namespace ActivityLogger.Controllers
{
    public class UsersController : ApiController
    {
        UserRepository repository = new UserRepository();
        [HttpPost]
        public void Post([FromBody]User ourUser)
        {
            repository.Create(ourUser);
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return repository.GetUsers();
        }
        [HttpGet]
        public User Get(int id)
        {
            return repository.Get(id);
        }
        [HttpPut]
        public void Put([FromBody]User ourUser)
        {
            repository.Update(ourUser);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
