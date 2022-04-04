import {CREATE_USER_GROUP, RETRIEVE_USER_GROUP} from "../ActionTypes";

const initialState = {
    loading: false,
    userGroup: "",
    userGroups: [],
    error: "",
};
const userGroupReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_USER_GROUP:
            return {
                ...state,
                userGroups: action.payload,
            };
        case CREATE_USER_GROUP:
            return {
                ...state,
                userGroups: action.payload,
            };
        default:
            return state;
    }
};
export default userGroupReducer;