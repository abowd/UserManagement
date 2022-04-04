using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    //[Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager; 
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly TaskUserDBContext _taskUser;
        public UsersController(UserManager<ApplicationUser> userManager, TaskUserDBContext taskUser, IMapper mapper , RoleManager<IdentityRole> roleManager,
                                      SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _taskUser = taskUser;
        }
        [HttpPost]
        [Route("RegisterUser")]
        public async Task<ApplicationUser> Register(UserDto userModel)
        {
            int Id =int.Parse(_taskUser.Set<ApplicationUser>().ToList().OrderByDescending(x => x.Id).Select(y => y.Id).FirstOrDefault());
            Id = Id + 1;
            var user = new ApplicationUser
            {
                Id = Id.ToString(),
                Email = userModel.Email,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                IsActive = true,
            };
            user.UserName = userModel.Email;
            var result = await _userManager.CreateAsync(user, userModel.Password);
            if (result.Succeeded)
            {
                IdentityUserRole<string> userrole = new IdentityUserRole<string>();
                userrole.RoleId = "2";
                userrole.UserId = user.Id;
                _taskUser.UserRoles.Add(userrole); 
                await _taskUser.SaveChangesAsync();
            }
            return user;
        }
        [HttpPost]
        [Route("LoginUser")]
        public async Task<UserDto> Login(LoginUserDto user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RememberMe, false);
            if (result.Succeeded)
            {
            var result1 = await _userManager.FindByEmailAsync(user.Email);
            var data = _mapper.Map<ApplicationUser, UserDto>(result1);
            if (data != null)
            {
                var userRole = await _taskUser.UserRoles.FirstOrDefaultAsync(x => x.UserId == result1.Id).ConfigureAwait(false);
                    if (userRole != null)
                    {
                        data.RoleId = userRole.RoleId;
                    }
                    return data;
            }
            }
            return null;
        }
        [HttpPost]
        [Route("Logout")]
        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("GetUserList")]
        public async Task<List<UserDetail>> GetUserList()
        {
            var data = await _taskUser.Users.ToListAsync().ConfigureAwait(false);
            return _mapper.Map<IList<ApplicationUser>, List<UserDetail>>(data);
        }
        [HttpGet]
        [Route("GetMoveUserList")]
        public async Task<List<UserDetail>> GetMoveUserList(string roleName)
        {
            var userData = await (from user in _taskUser.Users
                              join userRole in _taskUser.UserRoles
                              on user.Id equals userRole.UserId
                              join role in _taskUser.Roles
                              on userRole.RoleId equals role.Id
                              where role.Name == roleName
                              select user).ToListAsync();
            return _mapper.Map<List<ApplicationUser>, List<UserDetail>>(userData);
        }
        [HttpGet]
        [AllowAnonymous]
        [Route("GetUserDetailById/{id}")]
        public async Task<UserDetail> GetUserDetailById(string id)
        {
            var user = await _taskUser.Users.FirstOrDefaultAsync(x=>x.Id == id);
            return _mapper.Map<ApplicationUser, UserDetail>(user);
        }
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<bool> ResetPassword(ResetPasswordModal PasswordModel)
        {
            var user = await _userManager.FindByIdAsync(PasswordModel.Id);
            if (user == null)
                return false;
            var resetPassResult = await _userManager.ChangePasswordAsync(user, PasswordModel.OldPassword, PasswordModel.NewPassword);
            if (resetPassResult.Succeeded)
            {
                return true;
            }
            return false;
        }
        [HttpPost]
        [Route("ForgetPassword")]
        public async Task<bool> ForgetPassword(ForgetPasswordModal PasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(PasswordModel.Email);
            if (user == null)
                return false;
            await _userManager.RemovePasswordAsync(user);
            var resetPassResult = await _userManager.AddPasswordAsync(user, PasswordModel.Password);
            if (resetPassResult.Succeeded)
            {
                return true;
            }
            return false;
        }
        [HttpPost]
        [Route("UpdateUser")]
        public async Task<ApplicationUser> Update(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id);
            if (user != null)
            {
                var data = _mapper.Map<UserDto, ApplicationUser>(userDto, user);
                IdentityResult result = await _userManager.UpdateAsync(data);
                if (result.Succeeded)
                    return user;
            }
            return user;
        }
        [HttpPost]
        [Route("DeleteUser/{id}")]
        public async Task<bool> Delete(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                    return true;
            }
            return false;
        }
        [HttpPost]
        [Route("BlockedUser/{id}")]
        public async Task<bool> BlockedUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                user.IsActive = false;
                _taskUser.Users.Update(user);
                await _taskUser.SaveChangesAsync();
                return true;
            }
            return false;
        }
        [HttpPost]
        [Route("UnBlockedUser/{id}")]
        public async Task<bool> UnBlockedUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                user.IsActive = true;
                _taskUser.Users.Update(user);
                await _taskUser.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
