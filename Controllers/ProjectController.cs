using System.Collections.Generic;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.Services.Contracts;

namespace ActivityLogger.Controllers
{
    [RoutePrefix("api/project")]
    public class ProjectController : ApiController
    {
        IDefineProjectService projectService;
        public ProjectController(IDefineProjectService serv)
        {
            projectService = serv;
        }
        [Authorize]
        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            Logger.Log.Info(string.Concat("Controller: project - Project list is received "));
            return Ok(projectService.GetProjectsList());
        }
        [Authorize]
        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var project = projectService.GetProject(id);
            if (project == null)
            {
                Logger.Log.Error("Controller: project  - Project is not found.");
                return NotFound();
            }
            return Ok(project);
        }
    }
}
