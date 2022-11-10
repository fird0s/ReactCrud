import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { useFormik } from 'formik';
import {userFormValidationSchema} from '../../schemas';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddUser = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const navigate = useNavigate();
    const gender_option  = [
        { id: "male", label: "Male" },    
        { id: "female", label: "Female" }    
    ]
    const status_option  = [
        { id: "active", label: "Active" },    
        { id: "inactive", label: "In-Active" }    
    ]

    const doregister = async(values) => {
        
        axios.post("https://gorest.co.in/public/v2/users?access-token="+apiKeyGorest, {
                email : values.email,
                name: values.name,
                gender: values.gender,
                status: values.status
            })
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Your new record has been saved",
                    type: "success",
                    timer: 3000,
                });
                navigate("/users");
        });
    }

    const formik = useFormik({
        'initialValues':{
            'name': "",
            'email': "",
            'gender': "",
            'status': "",
        },
        validationSchema: userFormValidationSchema,
        onSubmit: doregister
    })
  
    return (
        <div className="columns">
            <div className="column is-two-fifths">
                <form onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className={formik.errors.name ? 'input is-danger' : 'input'} id="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="Title" />
                    </div>
                    {formik.errors.name  ? <p className="help is-danger">{formik.errors.name}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className={formik.errors.email ? 'input is-danger' : 'input'} id="email" value={formik.values.email} onChange={formik.handleChange} type="text" placeholder="Email" />
                    </div>
                    {formik.errors.email ? <p className="help is-danger">{formik.errors.email}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Gender</label>
                    <div className="control select is-primary">
                        <select id="gender" onChange={formik.handleChange}>
                            <option selected disabled>Select Gender</option>
                            {gender_option.map((option) => (
                            <option key={option.id} value={option.label}>
                                {option.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.gender   ? <p className="help is-danger">{formik.errors.gender}</p> : ""} 
                </div>     
                <div className="field">
                    <label className="label">Status</label>
                    <div className="control select is-primary">
                        <select id="status" onChange={formik.handleChange}>
                            <option selected disabled>Select Status</option>
                            {status_option.map((option) => (
                            <option value={option.id}>
                                {option.label}
                            </option>
                            ))}
                        </select>
                    </div>
                    {formik.errors.status ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                </div>     
                <div className="field">
                    <div className="control">
                        <button type="submit" className="button is-primary">Save</button>
                        <Link to="/users" className="button is-info">Cancel</Link>
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddUser
