using System.Collections.Generic;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Controllers
{
    [RoutePrefix("api/project")]
    public class ProjectController : ApiController
    {
        IProjectRepository repository;
        public ProjectController(IProjectRepository rep)
        {
            repository = rep;
        }
        [Route("")]
        [HttpPost]
        public void Post([FromBody]Project ourProject)
        {
            repository.Create(ourProject);
        }
        [Route("")]
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return repository.GetProjects();
        }
        [Route("{id}")]
        [HttpGet]
        public Project Get(int id)
        {
            return repository.Get(id);
        }
        [Route("")]
        [HttpPut]
        public void Put([FromBody]Project ourProject)
        {
            repository.Update(ourProject);
        }
        [Route("{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
