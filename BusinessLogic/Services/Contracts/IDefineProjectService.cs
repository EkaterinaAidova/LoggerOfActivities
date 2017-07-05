using System.Collections.Generic;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.BusinessLogic.Services.Contracts
{
    public interface IDefineProjectService
    {
        IEnumerable<ProjectInfo> GetProjectsList();
        ProjectInfo GetProject(int id);
    }
}
