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
                    WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "ID", "Email", autoCreateTables: true);
                var roles = (SimpleRoleProvider)Roles.Provider;
                var membership = (SimpleMembershipProvider)Membership.Provider;

                if (!roles.RoleExists("Admin"))
                {
                    roles.CreateRole("Admin");
                }
                if (!roles.RoleExists("User"))
                {
                    roles.CreateRole("User");
                }
                if (membership.GetUser("admin@admin.ru", false) == null)
                {
                    WebSecurity.CreateUserAndAccount("admin@admin.ru", "SuperAdminPassword", new { Name="Admin" });
                }
                if (!roles.GetRolesForUser("admin@admin.ru").Contains("Admin"))
                {
                    roles.AddUsersToRoles(new[] { "admin@admin.ru" }, new[] { "Admin" });
                }
            }
        }
    }
}