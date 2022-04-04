import { Formik } from "formik";
import * as Yup from "yup";
import "./Users/LoginUser.css";
import {useDispatch, useSelector} from "react-redux";
import { MoveTasktoAnotherUser } from '../store/Actions/TaskActions'
import { useEffect } from "react";
import { GetMoveUserList } from "../store/Actions/userActios";
import { useParams } from "react-router-dom";

const MoveTask = () => {
   const {id} = useParams();
   const users = useSelector((state) => state.user.users);
   const dispatch = useDispatch();
   const roleName ="USER";
   useEffect(() => {
    dispatch(GetMoveUserList(roleName));
   }, []);
  return (
  <Formik
    initialValues={{ Id : 0, userId : 0}}
    validationSchema={Yup.object().shape({
        userId: Yup.string()
        .required("Required"),
      })}
      
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        values.Id = id;
        dispatch(MoveTasktoAnotherUser(values));
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
          <h1>Move Task</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="userId">Users</label>
          <select name="userId" value={values.userId}
            onChange={handleChange}
            onBlur={handleBlur}
            // className="form-control"
            className={errors.userId && touched.userId && "error" || "form-control"}
            >
                <option value={0}>Select User</option>
                 {users.map((data, index) => {
                 return <option value={data.id}>{data.firstName}{' '}{data.lastName}</option>
                })}
          </select>
          {errors.userId && touched.userId && (
                <div className="input-feedback">{errors.userId}</div>
            )}
          <button type="submit" style={{marginTop: "20px"}} disabled={isSubmitting}>Move Task</button>

        </form>
        </div>
      );
    }}
  </Formik>
  );
  }
export default MoveTask;