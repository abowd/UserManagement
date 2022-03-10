using System;
using System.Collections.Generic;

#nullable disable

namespace UserManagement.Models
{
    public class Task
    {
        public Task()
        {
            UserTasks = new HashSet<UserTask>();
        }

        public long Id { get; set; }
        public long UserGroupId { get; set; }
        public string TaskTitle { get; set; }
        public string Description { get; set; }
        public long TaskStatusId { get; set; }

        public virtual TaskStatus TaskStatus { get; set; }
        public virtual UserGroup UserGroup { get; set; }
        public virtual ICollection<UserTask> UserTasks { get; set; }
    }
}
