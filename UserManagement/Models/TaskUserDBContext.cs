using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace UserManagement.Models
{
    public class TaskUserDBContext : IdentityDbContext<ApplicationUser>
    {
        public TaskUserDBContext()
        {
        }

        public TaskUserDBContext(DbContextOptions<TaskUserDBContext> options) : base(options)
        {
        }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<TaskStatus> TaskStatuses { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }
        public virtual DbSet<UserGroupUser> UserGroupUsers { get; set; }
        public virtual DbSet<UserTask> UserTasks { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskStatus>().HasData(
            new TaskStatus
            {
               Id = 1,
               Name = "Done",
            },
            new TaskStatus
            {
                Id = 2,
                Name = "Open",
            });
            modelBuilder.Entity<UserGroup>().HasData(
            new UserGroup
            {
                Id = 1,
                Name = "Administrator",
            },
            new UserGroup
            {
                Id = 2,
                Name = "AuthenticatedUser",
            }, 
            new UserGroup
            {
                Id = 3,
                Name = "Reviewer",
            });
            modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole
            {
                Id = "1",
                Name = "Admin",
            },
            new IdentityRole
            {
                Id = "2",
                Name = "User",
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
