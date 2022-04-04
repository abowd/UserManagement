import * as actionType from "../ActionTypes";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {createBrowserHistory} from 'history';
import { Redirect } from "react-router-dom";
const history = createBrowserHistory();

const api_url = "https://localhost:44320/";
export const logoutUser = () => {
     axios.post(`${api_url}api/users/Logout`).then(resp => {
        localStorage.removeItem("userId");
        localStorage.removeItem("roleId");
        window.location.href = "/login"
    });
    return { type: actionType.LOGOUT_USER };
}
export const loginUser = (login) => async (dispatch) => {
    const res = await axios.post(`${api_url}api/users/LoginUser`, login).then(resp => {
        localStorage.setItem("userId", Number(resp.data.id));
        localStorage.setItem("roleId", Number(resp.data.roleId));
        return resp;
        });
        dispatch({
            type: actionType.LOGIN_USER,
            payload: res.data,
        });
        window.location.href = "/";
        return Promise.resolve(res.data);
};
export const ResetPassword = (resetUser) => async (dispatch) => {
    const res = await axios.post(`${api_url}api/users/ResetPassword`, resetUser).then(resp => {
        return resp;
    });
    dispatch({
        type: actionType.RESET_PASSWORD,
        payload: res.data,
    });
    window.location.href = "/login";
    return Promise.resolve(res.data);
};
export const ForgetUserPassword = (forgetUser) => async (dispatch) => {
    const res = await axios.post(`${api_url}api/users/ForgetPassword`, forgetUser).then(resp => {
        return resp;
    });
    dispatch({
        type: actionType.FORGET_PASSWORD,
        payload: res.data,
    });
    window.location.href = "/login";
    return Promise.resolve(res.data);
};
export const RegisterUser = (user) => async (dispatch) => {
    const res = await axios.post(`${api_url}api/users/RegisterUser`, user).then(resp => {
            return resp;
        });
        dispatch({
            type: actionType.REGISTER_USER,
            payload: res.data,
        });
        window.location.href = "/login";
        return Promise.resolve(res.data);
};
export const retrieveAllUser=()=> {
    return (dispatch) => {
        axios
            .get(`${api_url}api/users/GetUserList`)
            .then(function (res) {
                dispatch({
                    type: actionType.RETRIEVE_ALL_USER,
                    payload: res.data,
                });
            })
    }
}
export const GetMoveUserList=(roleName)=> {
    return (dispatch) => {
        axios
            .get(`${api_url}api/users/GetMoveUserList?roleName=`+roleName)
            .then(function (res) {
                dispatch({
                    type: actionType.GET_ALL_MOVE_USERS,
                    payload: res.data,
                });
            })
    }
}
export function GetUserById(id) {
    return (dispatch) => {
        axios
            .get(`${api_url}api/users/GetUserDetailById/${id}`)
            .then(function (res) {
                dispatch({
                    type: actionType.RETRIEVE_USER_BY_ID,
                    payload: res.data,
                });
            })
    }
}

export const updateUser = (data) => {
    return (dispatch) => {
      axios.put(`${api_url}api/users/UpdateUser`, data)
      .then(resp => {
        dispatch({
            type: actionType.EDIT_USER,
            payload: resp.data,
        });
    });
  }
};
export const deleteUser = (id) => async (dispatch) => {
    await axios.post(`${api_url}api/users/DeleteUser/${id}`).then(resp => {
            return resp;
        });
        dispatch({
            type: actionType.DELETE_USER,
            payload: { id },
        });
        window.location.href = "/users";
};
export const blockUser = (id) => async (dispatch) => {
    await axios.post(`${api_url}api/users/BlockedUser/${id}`).then(resp => {
        return resp;
    });
    dispatch({
        type: actionType.BLOCK_USER,
        payload: { id },
    });
    window.location.href = "/users";
};
export const unBlockUser = (id) => async (dispatch) => {
    await axios.post(`${api_url}api/users/UnBlockedUser/${id}`).then(resp => {
        return resp;
    });
    dispatch({
        type: actionType.UNBLOCK_USER,
        payload: { id },
    });
    window.location.href = "/users";
};

