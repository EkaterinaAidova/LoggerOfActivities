using System;
using System.Linq;
using System.Threading;
using System.Web.Mvc;
using System.Web.Security;
using WebMatrix.WebData;

namespace ActivityLogger.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public sealed class InitializeSimpleMembershipAttribute : ActionFilterAttribute
    {
        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // Ensure ASP.NET Simple Membership is initialized only once per app start
            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
        }

        private class SimpleMembershipInitializer
        {
            public SimpleMembershipInitializer()
            { 
                    WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "ID", "Name", autoCreateTables: true);
                var roles = (SimpleRoleProvider)Roles.Provider;
                var membership = (SimpleMembershipProvider)Membership.Provider;

                if (!roles.RoleExists("Admin"))
                {
                    roles.CreateRole("Admin");
                }
                if (membership.GetUser("Admin", false) == null)
                {
                    membership.CreateUserAndAccount("Admin", "SuperAdminPassword");
                }
                if (!roles.GetRolesForUser("Admin").Contains("Admin"))
                {
                    roles.AddUsersToRoles(new[] { "Admin" }, new[] { "Admin" });
                }
            }
        }
    }
}