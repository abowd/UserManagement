import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import TaskReducers from './Reducers/TaskReducer';
import userReducer from './Reducers/userReducer';
import userGroupReducer from './Reducers/UserGroupReducers';
const initialState = {};
const middleware = [thunk];

const rootReducer = combineReducers({
   task : TaskReducers,
   user : userReducer,
   group : userGroupReducer
});

const configureStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default configureStore;