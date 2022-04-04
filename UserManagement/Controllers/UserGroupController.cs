using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Dto;
using UserManagement.Models;

namespace UserManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserGroupController : ControllerBase
    {
        private readonly TaskUserDBContext _taskUser;
        private readonly IMapper _mapper;
        public UserGroupController(TaskUserDBContext taskUser, IMapper mapper)
        {
            _mapper = mapper;
            _taskUser = taskUser;
        }
        [HttpGet]
        [Route("GetUserTaskList")]
        public async Task<List<TaskDto>> GetUserTaskList(int userGroupId)
        {
            var user = await _taskUser.Set<Models.Task>().ToListAsync().ConfigureAwait(false);
            user = user.Where(x => x.UserGroupId == userGroupId).ToList();
            return _mapper.Map<List<Models.Task>, List<TaskDto>>(user);
        }
        [HttpGet]
        [Route("GetUserGroupList")]
        public async Task<List<UserGroupDto>> GetUserGroupList()
        {
            var data = await _taskUser.UserGroups.ToListAsync().ConfigureAwait(false);
            return _mapper.Map<List<UserGroup>, List<UserGroupDto>>(data);
        }
        [HttpPost]
        [Route("AddUserGroup")]
        public async System.Threading.Tasks.Task AddUserGroup(UserGroupDto user)
        {
            var data = _mapper.Map<UserGroupDto, UserGroup>(user);
            await _taskUser.UserGroups.AddAsync(data).ConfigureAwait(false);
            await _taskUser.SaveChangesAsync();
        }
    }
}
