using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;
using ActivityLogger.Models.Repositories;
using ActivityLogger.Models.Repositories.Contracts;
using ActivityLogger.BusinessLogic.Services;
using ActivityLogger.BusinessLogic.Services.Contracts;
using System.Configuration;

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
            builder.Register(activiyRep=>new ActivityRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString)).As<IActivityRepository>().InstancePerRequest();
            builder.Register(autorizationRep => new AutorizationRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString)).As<IAutorizationRepository>().InstancePerRequest();
            builder.Register(userRep => new UserRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString)).As<IUserRepository>().InstancePerRequest();
            builder.Register(projectRep => new ProjectRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString)).As<IProjectRepository>().InstancePerRequest();
            builder.Register(timeLogRep => new TimeLogsRepository(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString)).As<ITimeLogsRepository>().InstancePerRequest();
            //Set the dependency resolver to be Autofac.  
            Container = builder.Build();
            return Container;
        }  
    }
}