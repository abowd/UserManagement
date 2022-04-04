import {
    CREATE_TASK, DELETE_TASK, RETRIEVE_TASK, RETRIEVE_STATUS_TASK,
    RETRIEVE_COMPLETE_TASK,MOVE_USER_TASK,
    RETRIEVE_USERGROUP_TASK, UPDATE_TASK
} from "../ActionTypes";
import axios from "axios";

const api_url = "https://localhost:44320/";

export const createTask = (task) => async (dispatch) => {
        const res = await axios.post('api/task/UserGroupTask', task).then(resp => {
            console.log(resp.data);
            return resp;
        });
        dispatch({
            type: CREATE_TASK,
            payload: res.data,
        });
        return Promise.resolve(res.data);
};
export const CompleteUserTask = (taskId) => async (dispatch) => {
        const res = await axios.post('api/task/CompleteUserTask/'+taskId).then(resp => {
            return resp;
        });
        dispatch({
            type: RETRIEVE_COMPLETE_TASK,
            payload: res.data,
        });
        window.location.href = "/task";
        return Promise.resolve(res.data);
};
export const MoveTasktoAnotherUser = (user) => async (dispatch) => {
    const res = await axios.post('api/task/MoveUserTask', user).then(resp => {
        return resp;
    });
    dispatch({
        type: MOVE_USER_TASK,
        payload: res.data,
    });
    window.location.href = "/task";
    return Promise.resolve(res.data);
};
export function retrieveTasks() {
    return (dispatch) => {
        axios
            .get(`${api_url}api/task/GetUserTask`)
            .then(function (res) {
                dispatch({
                    type: RETRIEVE_TASK,
                    payload: res.data,
                });
            })
    }
}
export function retrieveUserGroupTasks(userGroupId) {
    return (dispatch) => {
        axios
            .get(`${api_url}api/userGroup/GetUserTaskList/${userGroupId}`)
            .then(function (res) {
                dispatch({
                    type: RETRIEVE_USERGROUP_TASK,
                    payload: res.data,
                });
            })
    }
}
export function retrieveStatusTasks(taskStatusId) {
    return (dispatch) => {
        axios
            .get(`${api_url}api/userGroup/GetUserTaskList/${taskStatusId}`)
            .then(function (res) {
                dispatch({
                    type: RETRIEVE_STATUS_TASK,
                    payload: res.data,
                });
            })
    }
}
export const updateTask = (id, data) => async (dispatch) => {
    try {
        const res = await axios.put(`api/task/${id}`, data).then(resp => {
            console.log(resp.data);
            return resp;
        });
        dispatch({
            type: UPDATE_TASK,
            payload: data,
        });
        window.location.href = "/task";
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
export const deleteTask = (id) => async (dispatch) => {
    try {
        await axios.delete(`api/task/${id}`).then(resp => {
            console.log(resp.data);
            return resp;
        });
        dispatch({
            type: DELETE_TASK,
            payload: { id },
        });
        window.location.href = "/task";
    } catch (err) {
        console.log(err);
    }
};
