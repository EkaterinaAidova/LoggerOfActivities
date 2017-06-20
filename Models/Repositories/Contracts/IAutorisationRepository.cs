using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ActivityLogger.Models.Repositories.Contracts
{
    interface IAutorisationRepository
    {
        Autorisation Get(string login, string password);
        void Update(Autorisation autorisation);
    }
}
