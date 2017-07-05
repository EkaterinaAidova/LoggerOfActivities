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