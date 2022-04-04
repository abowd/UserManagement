import { Formik } from "formik";
import * as Yup from "yup";
import {Link} from "react-router-dom"
import {useDispatch} from "react-redux";
import { loginUser } from '../../store/Actions/userActios'
import "./LoginUser.css";
import { useHistory } from "react-router-dom";
const LoginUserForm = () => {
  const history = useHistory();
   const dispatch = useDispatch();
  return (
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number.")
      })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        dispatch(loginUser(values));
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
          <h1>Login Form</h1>
          <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
            />
            {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
            )}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
            />
            {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
            )}
            <div><a href="/forgetPassword" >Forget Password</a></div>
          <button type="submit" disabled={isSubmitting}>Login</button>

        </form>
        </div>
      );
    }}
  </Formik>
);
  }

export default LoginUserForm;