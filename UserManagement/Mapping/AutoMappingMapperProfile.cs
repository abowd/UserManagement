using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Dto;
using UserManagement.Models;

namespace UserManagement.Mapping
{
    public class AutoMappingMapperProfile : Profile
    {
        public AutoMappingMapperProfile()
        {
            CreateMap<UserDto, ApplicationUser>().ReverseMap();
            CreateMap<ApplicationUser, UserDetail>().ReverseMap();
            CreateMap<Models.Task, TaskDto>().ReverseMap();
        }
    }
}
