using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Filters;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace ActivityLogger.Controllers
{
   
    [AllowAnonymous]
    [InitializeSimpleMembership]
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(AuthorizationModel login)
        {
            if (ModelState.IsValid)
            {
                bool success = WebSecurity.Login(login.Email, login.Password, login.RememberMe);
                if (success)
                {
                    string returnUrl = Request.QueryString["ReturnUrl"];
                    if (returnUrl == null)
                    {
                        Response.Redirect("~/Home/index");
                    }
                    else
                    {
                        Response.Redirect(returnUrl);
                    }
                }
            }
            else
            {
                ModelState.AddModelError("Error", "Please enter Username and Password");
            }
            return View(login);
        }
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }
    }
}