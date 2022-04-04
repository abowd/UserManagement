import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserById } from '../../store/Actions/userActios';
import axios from "axios";
import { useHistory } from 'react-router-dom';
const api_url = "https://localhost:44320/";

const EditUserData = () => {
   const {id} = useParams();
   const dispatch = useDispatch();
   const history = useHistory();
   const initialValues = {
       id : 0,
       firstName: '',
       lastName: '',
       email: ''
   };

   const validationSchema = Yup.object().shape({
       firstName: Yup.string()
           .required('First Name is required'),
       lastName: Yup.string()
           .required('Last Name is required'),
       email: Yup.string()
           .email('Email is invalid')
           .required('Email is required'),
   });

   function onSubmit(fields, { setStatus, setSubmitting }) {
       setStatus();
       updateUser(id, fields, setSubmitting);
   };
   function updateUser(id, fields, setSubmitting) {
       fields.id = id;
       axios.post(`${api_url}api/users/UpdateUser`, fields)
       .then(resp => {
           history.push("/users")
       })
       setSubmitting(false);
   }

   return (
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
           {({ errors, touched, isSubmitting, setFieldValue }) => {
               const dispatch = useDispatch();
               useEffect(() => {
                axios.get(`${api_url}api/users/getuserdetailbyid/${id}`)
                .then(user => {
                    const data = user.data;
                    const fields = ['firstName', 'lastName', 'email'];
                    fields.forEach(field => setFieldValue(field, data[field], false));
                });          
               }, []);

               return (
                   <Form>
                       <h1>Edit User</h1>
                       <div className="form-row">
                           <div className="form-group col-12">
                               <label>First Name</label>
                               <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                               <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                           </div>
                           <div className="form-group col-12">
                               <label>Last Name</label>
                               <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                               <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                           </div>
                       </div>
                       <div className="form-row">
                           <div className="form-group col-12">
                               <label>Email</label>
                               <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                               <ErrorMessage name="email" component="div" className="invalid-feedback" />
                           </div>
                       </div>
                       <div className="form-group">
                           <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                               {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                               Update User
                           </button>
                       </div>
                   </Form>
               );
           }}
       </Formik>
   );
};

export default EditUserData;