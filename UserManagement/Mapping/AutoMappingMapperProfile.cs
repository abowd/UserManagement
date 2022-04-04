using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Dto;
using UserManagement.Models;
using TaskStatus = UserManagement.Models.TaskStatus;

namespace UserManagement.Mapping
{
    public class AutoMappingMapperProfile : Profile
    {
        public AutoMappingMapperProfile()
        {
            CreateMap<UserDto, ApplicationUser>().ReverseMap();
            CreateMap<ApplicationUser, UserDetail>().ReverseMap();
            CreateMap<Models.Task, TaskDto>().ReverseMap();
            CreateMap<UserGroup, UserGroupDto>().ReverseMap();
            CreateMap<TaskStatus, TaskStatusDto>().ReverseMap();
            CreateMap<Models.Task, UserGroupUser>().ReverseMap();
        }
    }
}
