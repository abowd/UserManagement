using System;
using System.Collections.Generic;


namespace UserManagement.Models
{
    public class UserGroupUser
    {
        public long Id { get; set; }
        public string UserId { get; set; }
        public long UserGroupId { get; set; }

        public virtual UserGroup UserGroup { get; set; }
    }
}
