using ActivityLogger.BusinessLogic.DataTransferObjects;
using ActivityLogger.Filters;
using System.Web.Mvc;
using System.Web.Security;
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
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegistrationModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    WebSecurity.CreateUserAndAccount(model.Email, model.Password,
                        new { Name = model.Name });
                    WebSecurity.Login(model.Email, model.Password);
                    return RedirectToAction("Index", "Home");
                }
                catch (MembershipCreateUserException e)
                {
                    ModelState.AddModelError("", e);
                }
            }
            return View(model);
        }
        public JsonResult CheckEmail(string email)
        {
            var result = WebSecurity.UserExists(email);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
         [HttpGet]
        public JsonResult GetCurrentUser()
        {
            return Json(WebSecurity.CurrentUserId);
        }
        [Route("Account/LogOut")]
        [HttpGet]
        public ActionResult Logout(){
            WebSecurity.Logout();
            return RedirectToAction("Login", "Account");
        }
    }
}