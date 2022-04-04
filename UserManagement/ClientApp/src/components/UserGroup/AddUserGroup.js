import { Formik } from "formik";
import * as Yup from "yup";
import "../Users/LoginUser.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createUserGroup, userGroupList } from "../../store/Actions/UserGroupAction";
const AddUserGroup = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userGroupList());
    }, []);
    return (
        <Formik
            initialValues={{ Id: 0, name: ""}}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required("Required"),
            })}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    dispatch(createUserGroup(values));
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
                        <h1>Create User Group</h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter User Group"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.name && touched.name && "error"}
                            />
                            {errors.name && touched.name && (
                                <div className="input-feedback">{errors.name}</div>
                            )}
                            <button type="submit" style={{ marginTop: "20px" }} disabled={isSubmitting}>Create User Group</button>

                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}
export default AddUserGroup;