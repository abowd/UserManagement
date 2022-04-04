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
    public class TaskController : ControllerBase
    {
        private readonly TaskUserDBContext _taskUser;
        private readonly IMapper _mapper;
        public TaskController( TaskUserDBContext taskUser, IMapper mapper)
        {
            _mapper = mapper;
            _taskUser = taskUser;
        }
        [HttpGet]
        [Route("GetUserTaskList/{taskStatusId}")]
        public async Task<List<TaskDto>> GetUserTaskList(int taskStatusId)
        {
            var user = await _taskUser.Set<Models.Task>().Include(x=>x.TaskStatus).Include(y=>y.UserGroup).ToListAsync().ConfigureAwait(false);
            user = user.Where(x => x.TaskStatusId == taskStatusId).ToList();
            return _mapper.Map<List<Models.Task>, List<TaskDto>>(user);
        }
        [HttpPost]
        [Route("UserGroupTask")]
        public async Task<Models.Task> UserGroupTask(TaskDto taskModel)
        {
            var task = _mapper.Map<TaskDto, Models.Task>(taskModel);
            task.TaskStatusId = 2;
            if (task != null)
            {
                await _taskUser.Tasks.AddAsync(task);
                var data = _mapper.Map<Models.Task, UserGroupUser>(task);
                _taskUser.UserGroupUsers.Add(data);
                await _taskUser.SaveChangesAsync();
            }
            return task;
        }
        [HttpGet]
        [Route("GetUserTask")]
        public async Task<List<TaskDto>> GetUserTask()
        {
            var user = await _taskUser.Set<Models.Task>().Include(x => x.TaskStatus).Include(y => y.UserGroup).ToListAsync().ConfigureAwait(false);
            return _mapper.Map<List<Models.Task>, List<TaskDto>>(user);
        }
        [HttpPost]
        [Route("CompleteUserTask/{taskId}")]
        public async Task<Models.Task> CompleteUserTask(int taskId)
        {
            var user = await _taskUser.Set<Models.Task>().FirstOrDefaultAsync(x=>x.Id == taskId);
            user.TaskStatusId = 1;
            _taskUser.Set<Models.Task>().Update(user);
            await _taskUser.SaveChangesAsync();
            return user;
        }
        [HttpPost]
        [Route("MoveUserTask")]
        public async Task<bool> MoveUserTask(MoveUserDto userDto)
        {
            var user = await _taskUser.Set<UserGroupUser>().FirstOrDefaultAsync(x => x.UserGroupId == userDto.Id);
            if (user != null)
            {
                user.UserId = userDto.UserId;
                _taskUser.Set<UserGroupUser>().Update(user);
                await _taskUser.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
