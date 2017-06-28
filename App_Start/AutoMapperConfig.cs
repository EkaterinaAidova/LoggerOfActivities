using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
                config.CreateMap<Autorisation, LoginAndPassword>().ReverseMap();
                config.CreateMap<User, UserInfo>().ReverseMap();
            });
        }
     }
}