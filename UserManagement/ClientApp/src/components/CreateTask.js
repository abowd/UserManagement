import { Formik } from "formik";
import * as Yup from "yup";
import "./Users/LoginUser.css";
import {useDispatch, useSelector} from "react-redux";
import { createTask } from '../store/Actions/TaskActions'
import { useEffect } from "react";
import { userGroupList } from "../store/Actions/UserGroupAction";
import { useHistory } from "react-router-dom";
const CreateUserGroupTask = () => {
  const history = useHistory();
    var userGroups = useSelector((state)=> state.group.userGroups);
   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(userGroupList());
}, []);
  return (
  <Formik
    initialValues={{ Id : 0, userGroupId : 0,taskTitle: "", description: "" }}
    validationSchema={Yup.object().shape({
        userGroupId: Yup.string()
        .required("Required"),
        taskTitle: Yup.string()
        .required("Required"),
        description: Yup.string()
          .required("Required"),
      })}
      
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        dispatch(createTask(values));
        setSubmitting(false);
      }, 500);
    }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <div>
          <h1>Create User Group Task</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor="taskTitle">Task Title</label>
          <input
            id="taskTitle"
            name="taskTitle"
            type="text"
            placeholder="Enter Task Title"
            value={values.taskTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.taskTitle && touched.taskTitle && "error"}
            />
            {errors.taskTitle && touched.taskTitle && (
                <div className="input-feedback">{errors.taskTitle}</div>
            )}
            <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter Description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.description && touched.description && "error"}
            />
            {errors.description && touched.description && (
                <div className="input-feedback">{errors.description}</div>
            )}
            <label htmlFor="userGroupId">User Group</label>
          <select name="userGroupId" value={values.userGroupId}
            onChange={handleChange}
            onBlur={handleBlur}
            // className="form-control"
            className={errors.userGroupId && touched.userGroupId && "error" || "form-control"}
            >
                <option value={0}>Select User Group</option>
                 {userGroups.map((data, index) => {
                 return <option value={data.id}>{data.name}</option>
                })}
          </select>
          {errors.userGroupId && touched.userGroupId && (
                <div className="input-feedback">{errors.userGroupId}</div>
            )}
          <button type="submit" style={{marginTop: "20px"}} disabled={isSubmitting}>Create Task</button>

        </form>
        </div>
      );
    }}
  </Formik>
  );
  }
export default CreateUserGroupTask;