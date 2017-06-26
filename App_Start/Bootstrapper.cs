using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using ActivityLogger.Util;


namespace ActivityLogger.App_Start
{
    public class Bootstrapper
    {
        public static void Run()
        {
            //Configure AutoFac  
            AutofacConfig.Initialize(GlobalConfiguration.Configuration);
        }  
    }
}