import {
    CREATE_TASK, DELETE_TASK, RETRIEVE_TASK, RETRIEVE_STATUS_TASK,
    RETRIEVE_USERGROUP_TASK, RETRIEVE_COMPLETE_TASK, MOVE_USER_TASK
} from "../ActionTypes";

const initialState = {
    loading: false,
    task: "",
    tasks: [],
    error: "",
};
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIEVE_COMPLETE_TASK:
            return {
                ...state,
                task: action.payload
            };
        case CREATE_TASK:
            return {
                ...state,
                task: action.payload
            };
        case MOVE_USER_TASK:
            return {
                ...state,
                task: action.payload
            };
        case RETRIEVE_TASK:
            return {
                ...state,
                tasks: action.payload,
            };
        case RETRIEVE_STATUS_TASK:
            return {
                ...state,
                tasks: action.payload,
            };
        case RETRIEVE_USERGROUP_TASK:
            return {
                ...state,
                tasks: action.payload,
            };
        case DELETE_TASK:
            return state.tasks.filter(({ id }) => id !== action.payload.id);
        default:
            return state;
    }
};
export default taskReducer;