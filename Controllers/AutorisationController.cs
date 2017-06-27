using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
namespace ActivityLogger.Controllers
{
    public class AutorisationController : ApiController
    {
        ILoginingService loginingService;
        public AutorisationController(ILoginingService service)
        {
            loginingService = service;
        }
       /* [HttpPost]
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
        }*/
        [HttpGet]
        private int Get(LoginAndPassword data)
        {
            return loginingService.LogIn(data);
        }
       /* [HttpPut]
        public void Put([FromBody]Autorisation ourData)
        {
            repository.Update(ourData);
        }*/
        /*[HttpDelete]
        private void Delete(int id)
        {
            repository.Delete(id);
        }*/
    }
}
