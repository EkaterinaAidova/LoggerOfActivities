using System.Collections.Generic;
using ActivityLogger.Models;
using AutoMapper;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services
{
    public class DefineProjectService : IDefineProjectService
    {
        IProjectRepository projectRepository;
        public DefineProjectService(IProjectRepository repo)
        {
            projectRepository = repo;
        }
        public IEnumerable<ProjectInfo> GetProjectsList()
        {
            var projects = projectRepository.GetProjects();
            return Mapper.Map<IEnumerable<Project>, List<ProjectInfo>>(projects);
        }
        public ProjectInfo GetProject(int id)
        {
            return Mapper.Map<Project, ProjectInfo>(projectRepository.Get(id));
        }
    }
}