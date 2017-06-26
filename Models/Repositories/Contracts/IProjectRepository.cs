using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityLogger.Models.Repositories.Contracts
{
     public interface IProjectRepository
    {
        List<Project> GetProjects();
        Project Get(int id);
        Project Create(Project project);
        void Update(Project project);
        void Delete(int id);
    }
}
