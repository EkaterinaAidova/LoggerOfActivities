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
        public IHttpActionResult Get( string login, string password)
        {
            if (loginingService.IsInsertValid(login, password))
            {
                var loginingResult = loginingService.LogIn(login, password);
                if (loginingResult == null)
                {
                    Logger.Log.Error("Controller: autorisation  - Autorisation is failed. User is not found.");
                    return NotFound();
                }
                Logger.Log.Info("Controller: autorisation  - Auturisation is success. Data is got");
                return Ok(loginingResult);
            }
            Logger.Log.Error("Controller: autorisation  - Autorisation is failed. Data is not valid.");
            return BadRequest();
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
