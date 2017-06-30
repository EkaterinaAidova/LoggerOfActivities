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
using ActivityLogger.BusinessLogic.Services;
using ActivityLogger.BusinessLogic.Services.Contracts;


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
            //services
            builder.RegisterType<LoginingServiice>().As<ILoginingService>().InstancePerRequest();
            builder.RegisterType<DefineUserService>().As<IDefineUserService>().InstancePerRequest();
            builder.RegisterType<DefineProjectService>().As<IDefineProjectService>().InstancePerRequest();
            builder.RegisterType<DefineActivityService>().As<IDefineActivityService>().InstancePerRequest();
            builder.RegisterType<WorkWithLogsService>().As<IWorkWithLogsService>().InstancePerRequest();
            //repositories
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