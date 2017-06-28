using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ActivityLogger.BusinessLogic.DataTransferObjects
{
    public class LoginAndPassword
    {
        int ID { get; set;}
        public string Login{get; set;}
        public string Password{get; set;}
    }
}