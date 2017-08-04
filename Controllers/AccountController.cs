using ActivityLogger.Filters;
using ActivityLogger.Models;
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
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return Redirect(returnUrl);
                    }
                }
               
            }
            ModelState.AddModelError("", "Не удалось войти на сайт. Неверный логин и пароль");
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
        [AllowAnonymous]
        public JsonResult CheckEmail(string Email)
        {
            var result = WebSecurity.UserExists(Email);
            return Json(!result, JsonRequestBehavior.AllowGet);
        }
       
    }
}