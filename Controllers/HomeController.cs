using System.Web.Mvc;

namespace ActivityLogger.Controllers
{
   
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}
