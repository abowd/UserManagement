using System;
using System.Collections.Generic;

#nullable disable

namespace UserManagement.Models
{
    public class UserTask
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public long TaskId { get; set; }
        public long? TasksId { get; set; }

        public virtual Task Tasks { get; set; }
    }
}
