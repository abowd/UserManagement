using System;
using System.Collections.Generic;

#nullable disable

namespace UserManagement.Models
{
    public class UserGroup
    {
        public UserGroup()
        {
            Tasks = new HashSet<Task>();
            UserGroupUsers = new HashSet<UserGroupUser>();
        }

        public long Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
        public virtual ICollection<UserGroupUser> UserGroupUsers { get; set; }
    }
}
