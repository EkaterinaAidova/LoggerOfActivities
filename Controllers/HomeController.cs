using ActivityLogger.Filters;
using System.Web.Mvc;

namespace ActivityLogger.Controllers
{
    [InitializeSimpleMembership]
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}
