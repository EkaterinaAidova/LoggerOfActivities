using System.Collections.Generic;

namespace ActivityLogger.Models.Repositories.Contracts
{
    public interface ITimeLogRepository
    {
        List<TimeLog> GetTimeLogs();
        List<TimeLog> GetUserTimeLogs(int userID);
        List<TimeLog> GetUserLogsWithStatus(int idUser, int status);
        TimeLog Get(int id);
        TimeLog Create(TimeLog timeLog);
        void Update(TimeLog timeLog);
        void Delete(int id);

    }
}
