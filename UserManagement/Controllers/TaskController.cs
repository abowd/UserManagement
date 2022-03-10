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
        public async Task<List<TaskDto>> GetUserTaskList(int taskStatusId)
        {
            var user = await _taskUser.Set<Models.Task>().ToListAsync().ConfigureAwait(false);
            user = user.Where(x => x.TaskStatusId == taskStatusId).ToList();
            return _mapper.Map<List<Models.Task>, List<TaskDto>>(user);
        }
        [HttpGet]
        public async Task<List<TaskDto>> GetUserTask()
        {
            var user = await _taskUser.Set<Models.Task>().ToListAsync().ConfigureAwait(false);
            return _mapper.Map<List<Models.Task>, List<TaskDto>>(user);
        }
        [HttpPost]
        public async Task<Models.Task> CompleteUserTask(int taskId, int taskStatusId)
        {
            var user = await _taskUser.Set<Models.Task>().FirstOrDefaultAsync(x=>x.Id == taskId);
            user.TaskStatusId = taskStatusId;
            return user;
        }
        [HttpPost]
        public async Task<bool> MoveUserTask(string userId)
        {
            var user = await _taskUser.Set<UserGroupUser>().FirstOrDefaultAsync(x => x.UserId == userId);
            if (user != null)
            {
                await _taskUser.Set<UserGroupUser>().AddAsync(user);
                return true;
            }
            return false;
        }
    }
}
