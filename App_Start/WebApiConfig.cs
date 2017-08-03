using System.Web.Http;
using System.Web.Http.Cors;

namespace ActivityLogger
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            config.Routes.MapHttpRoute(
             name: "ActionApi",
             routeTemplate: "api/{controller}/{action}",
             defaults: null
             );
        }
    }
}
