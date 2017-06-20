using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories.Contracts;
namespace ActivityLogger.Controllers
{
    public class ProjectController : ApiController
    {
        IProjectRepository repository;
        public ProjectController(IProjectRepository rep)
        {
            repository = rep;
        }
        [HttpPost]
        public void Post([FromBody]Project ourProject)
        {
            repository.Create(ourProject);
        }
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return repository.GetProjects();
        }
        [HttpGet]
        public Project Get(int id)
        {
            return repository.Get(id);
        }
        [HttpPut]
        public void Put([FromBody]Project ourProject)
        {
            repository.Update(ourProject);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
