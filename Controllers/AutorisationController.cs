using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories;
namespace ActivityLogger.Controllers
{
    public class AutorisationController : ApiController
    {
        AutorisationRepository repository = new AutorisationRepository();
        [HttpPost]
        public void Post([FromBody] Autorisation ourData)
        {
            repository.Create(ourData);
        }
        [HttpGet]
        private IEnumerable<Autorisation> Get()
        {
            return repository.GetAutorisationList();
        }
        [HttpGet]
        private Autorisation Get(int id)
        {
            return repository.Get(id);
        }
        [HttpGet]
        private Autorisation Get(string login, string password)
        {
            return repository.Get(login, password);
        }
        [HttpPut]
        public void Put([FromBody]Autorisation ourData)
        {
            repository.Update(ourData);
        }
        [HttpDelete]
        private void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
