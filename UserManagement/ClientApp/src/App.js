import React, { Component, useState } from 'react';
import { Home } from './components/Home';
import Task from './components/Task';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import StatusTask from './components/StatusTask';
import UserGroupTask from './components/userGroupTask';
import LoginUserForm from './components/Users/LoginUser';
import RegisterUserForm from './components/Users/RegisterUser';
import UsersList from './components/Users/UsersList';
import './custom.css'
import ResetUserPassword from './components/Users/ResetPassword';
import ForgetPassword from './components/Users/ForgetPassword';
import CreateUserGroupTask from './components/CreateTask';
import MoveTask from './components/MoveTask';
import EditUserData from './components/Users/EditUser';
import { useDispatch } from 'react-redux';
import { logoutUser } from './store/Actions/userActios';
import AddUserGroup from './components/UserGroup/AddUserGroup';



const App = () => {
        const userId = localStorage.getItem('userId');
        const roleId = localStorage.getItem('roleId');
        const dispatch = useDispatch()
        function logout(){  dispatch(logoutUser());  }
      return (

          <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand">
                        User Management
                    </a>
                  <div className="navbar-nav mr-auto">
                      <li className="nav-item"><Link to={"/"} className="nav-link">Home </Link></li>
                      {roleId == 1 && userId && <li className="nav-item"><Link to={"/users"} className="nav-link">Users </Link></li>}
                      {roleId == 1 && userId && <li className="nav-item"><Link to={"/addUserGroup"} className="nav-link">Create User Group </Link></li>}
                      {roleId == 1 && userId && <li className="nav-item"><Link to={"/userTask"} className="nav-link">Create Task</Link></li> }
                      {roleId == 1 && userId && <li className="nav-item"><Link to={"/register"} className="nav-link">Create User</Link></li>}
                      {userId && roleId == 2 && <li className="nav-item"><Link to={"/task"} className="nav-link">Task </Link></li>}
                      {userId && roleId == 2 && <li className="nav-item"><Link to={"/resetPassword"} className="nav-link">Reset Password</Link></li>}
                      {!userId && <li className="nav-item"><Link to={"/login"} className="nav-link">Login</Link></li>}
                      {userId && <li className="nav-item"><a href='#' onClick={logout} className="nav-link">Logout</a></li>}
                    </div>
              </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/task' component={Task} />
                        <Route path='/users' component={UsersList} />
                        <Route path='/status-task' component={StatusTask} />
                        <Route path='/userGroup-task' component={UserGroupTask} />
                        <Route path='/login' component={LoginUserForm} />
                        <Route path='/register' component={RegisterUserForm} />
                        <Route path='/resetPassword' component={ResetUserPassword} />
                        <Route path='/forgetPassword' component={ForgetPassword} />
                        <Route path='/userTask' component={CreateUserGroupTask} />
                        <Route path='/moveTask/:id' component={MoveTask} />
                        <Route path='/editUser/:id' component={EditUserData} />
                        <Route path='/addUserGroup' component={AddUserGroup} />
                    </Switch>
                </div>
            </Router>
    );
}
export default App;