using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly TaskUserDBContext _taskUser;
        public UsersController(UserManager<IdentityUser> userManager, TaskUserDBContext taskUser, IMapper mapper ,
                                      SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _taskUser = taskUser;
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Register(UserDto userModel)
        {
            var user = _mapper.Map<ApplicationUser>(userModel);
            user.UserName = userModel.FirstName + " " + userModel.LastName;
            var result = await _userManager.CreateAsync(user, userModel.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "User");
                return true;
            }
            else
                return false;
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<bool> Login(LoginUserDto user)
        {
            var result = await _signInManager.PasswordSignInAsync(user.Email, user.Password, user.RememberMe, false);
            if (result.Succeeded)
                return true;
            else
                return false;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<List<UserDetail>> GetUserList()
        {
            var user = await _taskUser.Set<ApplicationUser>().ToListAsync();
            return _mapper.Map<List<ApplicationUser>, List<UserDetail>>(user);
        }
        [HttpPost]
        public async Task<bool> ResetPassword(ForgetPasswordModal PasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(PasswordModel.Email);
            if (user == null)
                return false;
            await _userManager.RemovePasswordAsync(user);
            var resetPassResult = await _userManager.AddPasswordAsync(user, PasswordModel.NewPassword);
            if (!resetPassResult.Succeeded)
            {
                return true;
            }
            return false;
        }
        [HttpPost]
        public async Task<bool> Update(UserDto userDto)
        {
            var user = await _userManager.FindByIdAsync(userDto.Id.ToString());
            if (user != null)
            {
                IdentityResult result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                    return true;
            }
            return false;
        }
        [HttpPost]
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
        public async Task<List<UserDetail>> BlockedUser()
        {
            var user = await _taskUser.Set<ApplicationUser>().ToListAsync();
            user = user.Where(x => x.IsActive == false).ToList();
            return _mapper.Map<List<ApplicationUser>, List<UserDetail>>(user);
        }
    }
}
