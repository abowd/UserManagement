import {CREATE_USER_GROUP, RETRIEVE_USER_GROUP} from "../ActionTypes";
import axios from "axios";

const api_url = "https://localhost:44320/";

export function userGroupList() {
    return (dispatch) => {
        axios
            .get(`${api_url}api/userGroup/GetUserGroupList`)
            .then(function (res) {
                dispatch({
                    type: RETRIEVE_USER_GROUP,
                    payload: res.data,
                });
            })
    }
}
export const createUserGroup = (userGroup) => async (dispatch) => {
    const res = await axios.post('api/userGroup/AddUserGroup', userGroup).then(resp => {
        return resp;
    });
    dispatch({
        type: CREATE_USER_GROUP,
        payload: res.data,
    });
    window.location.href = "/users";
    return Promise.resolve(res.data);
};

