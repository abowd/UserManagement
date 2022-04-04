using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Models;

namespace UserManagement.Dto
{
    public class TaskDto
    {
        public long Id { get; set; }
        public long UserGroupId { get; set; }
        public string TaskTitle { get; set; }
        public string Description { get; set; }
        public long TaskStatusId { get; set; }
        public TaskStatusDto TaskStatus { get; set; }
        public UserGroupDto UserGroup { get; set; }
    }
}
