using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityLogger.Models.Repositories.Contracts
{
     public interface ITimeLogsRepository
    {
        List<TimeLog> GetTimeLogs();
        List<TimeLog> GetUserTimeLogs(int userID);
        List<TimeLog> GetUserLogsWithStatus(int idUser, int status);
        TimeLog Create(TimeLog timeLog);
        void Update(TimeLog timeLog);
        void Delete(int id);

    }
}
