using AutoMapper;
using ActivityLogger.Models;
using ActivityLogger.BusinessLogic.DataTransferObjects;

namespace ActivityLogger.App_Start
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize((config) =>
            {
                config.CreateMap<User, UserInfo>().ReverseMap();
                config.CreateMap<Activity, ActivityInfo>().ReverseMap();
                config.CreateMap<Project, ProjectInfo>().ReverseMap();
                config.CreateMap<TimeLogForCreationInfo, TimeLog>().ReverseMap();
            });
        }
     }
}