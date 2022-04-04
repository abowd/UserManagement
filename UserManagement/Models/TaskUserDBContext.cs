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
                Name = "ADMIN",
            },
            new IdentityRole
            {
                Id = "2",
                Name = "USER",
            });
            modelBuilder.Entity<ApplicationUser>().HasData(
            new ApplicationUser
            {
                Id = "1",
                FirstName = "ADMIN",
                LastName = "ADMIN",
                UserName = "admin@usermanagement.com",
                Email = "admin@usermanagement.com",
                NormalizedEmail = "ADMIN@USERMANAGEMENT.COM",
                NormalizedUserName = "ADMIN@USERMANAGEMENT.COM",
                PasswordHash = "AQAAAAEAACcQAAAAEHfFjtWC2fbkXSl2JrHpkRHoBoWtsgQ3QorUA1JylK8/yLAdqgfLxCBQ5Z0AM82CCA==",
                IsActive = true,
                IsDeleted = false,
                PhoneNumberConfirmed = false,
                EmailConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true
            },
            new ApplicationUser
            {
                Id = "2",
                FirstName = "USER",
                LastName = "USER",
                UserName = "user@usermanagement.com",
                Email = "user@usermanagement.com",
                NormalizedEmail = "USER@USERMANAGEMENT.COM",
                NormalizedUserName = "USER@USERMANAGEMENT.COM",
                PasswordHash = "AQAAAAEAACcQAAAAEHfFjtWC2fbkXSl2JrHpkRHoBoWtsgQ3QorUA1JylK8/yLAdqgfLxCBQ5Z0AM82CCA==",
                IsActive = true,
                IsDeleted = false,
                PhoneNumberConfirmed = false,
                EmailConfirmed = false,
                TwoFactorEnabled = false,
                LockoutEnabled = true
            });
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string>
            {
                RoleId = "1",
                UserId = "1",
            },
            new IdentityUserRole<string>
            {
                RoleId = "2",
                UserId = "2",
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
