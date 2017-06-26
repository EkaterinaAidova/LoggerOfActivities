using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
