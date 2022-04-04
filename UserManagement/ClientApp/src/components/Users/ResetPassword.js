import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ResetPassword } from '../../store/Actions/userActios'
import "./LoginUser.css";

const ResetUserPassword = () => {
   const dispute = useDispatch();
   const history = useHistory();
 return(<Formik
    initialValues={{ id: 0, oldPassword: "", newPassword: "", confirmPassword : "" }}
    validationSchema={Yup.object().shape({
        oldPassword: Yup.string()
          .required("You shoud enter your old password"),
          newPassword: Yup.string()
          .required("No new password provided.")
          .min(8, "New password is too short - should be 8 chars minimum.")
          .matches(/(?=.*[0-9])/, "New password must contain a number."),
          confirmPassword: Yup.string()
          .min(8)
          .when("newPassword", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
              [Yup.ref("newPassword")],
              "Both password need to be the same"
            ),
          })
          .required("Confirm Password Required"),
      })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        values.id = '1';
        debugger;
        dispute(ResetPassword(values));
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
          <h1>Reset Password</h1>
          <form onSubmit={handleSubmit}>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Enter your old password"
            value={values.oldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.oldPassword && touched.oldPassword && "error"}
            />
            {errors.oldPassword && touched.oldPassword && (
                <div className="input-feedback">{errors.oldPassword}</div>
            )}  

          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.newPassword && touched.newPassword && "error"}
            />
            {errors.newPassword && touched.newPassword && (
                <div className="input-feedback">{errors.newPassword}</div>
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
          <button type="submit" disabled={isSubmitting}>Reset Password</button>

        </form>
        </div>
      );
    }}
  </Formik>
);
}
export default ResetUserPassword;