import { Formik } from "formik";
import * as Yup from "yup";
import "./LoginUser.css";
import {useDispatch} from "react-redux";
import { ForgetUserPassword } from '../../store/Actions/userActios'
import { useHistory } from "react-router-dom";
const ForgetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 return(
  <Formik
    initialValues={{ email: "", password: "", confirmPassword : "" }}
    validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required("Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        confirmPassword: Yup.string()
          .min(8)
          .when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("password")],
              "Both password need to be the same"
            ),
          })
          .required("Confirm Password Required"),
      })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
       dispatch(ForgetUserPassword(values));
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
          <h1>Forget Password</h1>
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
           <label htmlFor="confirmPassword">Confirm Password</label> 
           <input 
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter your Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword && touched.confirmPassword && "error"}
            />
            {errors.confirmPassword && touched.confirmPassword && (
                <div className="input-feedback">{errors.confirmPassword}</div>
            )}
          <button type="submit" disabled={isSubmitting}>Update Password</button>

        </form>
        </div>
      );
    }}
  </Formik>
);
}
export default ForgetPassword;