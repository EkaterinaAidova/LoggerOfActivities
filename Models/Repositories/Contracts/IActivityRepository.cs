using System.Collections.Generic;

namespace ActivityLogger.Models.Repositories.Contracts
{
     public interface IActivityRepository
    {
       List<Activity> GetActivities();
       Activity Get(int id);
       Activity Create(Activity activity);
       void Update(Activity activity);
       void Delete(int id);
    }

}
