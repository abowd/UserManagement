import * as actionType from "../ActionTypes";

const initialState = {
    loading: false,
    isLoggedIn : false,
    user: {},
    users: [],
    error: "",
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.REGISTER_USER:
            return {
                ...state,
                user: action.payload
            };
        case actionType.FORGET_PASSWORD:
            return {
                ...state,
                user: action.payload
            };
        case actionType.RESET_PASSWORD:
            return {
                ...state,
                user: action.payload
            };
        case actionType.LOGIN_USER:
            return {
                ...state,
                user: action.payload
            };
        case actionType.LOGOUT_USER:
            return {};
        case actionType.RETRIEVE_ALL_USER:
            return {
                ...state,
                users: action.payload,
            };
        case actionType.GET_ALL_MOVE_USERS:
            return {
                ...state,
                users: action.payload,
            };
        case actionType.RETRIEVE_USER_BY_ID:
            return {
                ...state,
                user: action.payload,
            };
        case actionType.EDIT_USER:    
            return {    
                ...state,    
                users: state.users.map(    
                    (content, i) => content.id === action.payload.id ? {...content, firstName : action.payload.firstName ,  lastName : action.payload.lastName,  email : action.payload.email  }    
                                            : content)    
            };    
        case actionType.DELETE_USER:
            return state.users.filter(({ id }) => id !== action.payload.id);
        case actionType.BLOCK_USER:
            return state.users.filter(({ id }) => id !== action.payload.id);
        case actionType.UNBLOCK_USER:
            return state.users.filter(({ id }) => id !== action.payload.id);
        default:
            return state;
    }
};
export default userReducer;