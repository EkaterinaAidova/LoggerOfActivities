using Autofac;
using Autofac.Core;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi; 
using System.Web.Mvc;
using ActivityLogger.Controllers;
using System.Reflection;
using System.Web;
using System.Web.Http;
using ActivityLogger.Models.Repositories;
using ActivityLogger.Models.Repositories.Contracts;

namespace ActivityLogger.Util
{
    public class AutofacConfig
    {
        public static IContainer Container;

        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }


        public static void Initialize(HttpConfiguration config, IContainer container)
        {
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            //Register your Web API controllers.  
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
           /* builder.RegisterType<ActivityController>().WithParameter("rep", new ActivityRepository()).InstancePerRequest();
            builder.RegisterType<AutorisationController>().WithParameter("rep", new AutorisationRepository()).InstancePerRequest();
            builder.RegisterType<UsersController>().WithParameter("rep", new UserRepository()).InstancePerRequest();
            builder.RegisterType<ProjectController>().WithParameter("rep", new ProjectRepository()).InstancePerRequest();
            builder.RegisterType<TimeLogsController>().WithParameter("rep", new TimeLogsRepository()).InstancePerRequest();*/

            builder.RegisterType<ActivityRepository>().As<IActivityRepository>().InstancePerRequest();
            builder.RegisterType<AutorisationRepository>().As<IAutorisationRepository>().InstancePerRequest();
            builder.RegisterType<UserRepository>().As<IUserRepository>().InstancePerRequest();
            builder.RegisterType<ProjectRepository>().As<IProjectRepository>().InstancePerRequest();
            builder.RegisterType<TimeLogsRepository>().As<ITimeLogsRepository>().InstancePerRequest();

            //Set the dependency resolver to be Autofac.  
            Container = builder.Build();

            return Container;
        }  
  
    }
}