import {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFormik } from 'formik';
import {userFormValidationSchema} from '../../schemas';
import { getValue } from '@testing-library/user-event/dist/utils';

const EditUser = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [FormValues, setValues] = useState({});
    const gender_option  = [
        { id: "male", label: "Male" },    
        { id: "female", label: "Female" }    
    ]

    const status_option  = [
        { id: "active", label: "Active" },    
        { id: "inactive", label: "In-Active" }    
    ]
    const navigate = useNavigate();
    let {userId} = useParams();
    
    useEffect (() => {
        getUserById();
    }, []);

    const updateUser = async(values) => {
        axios.put("https://gorest.co.in/public/v2/users/"+userId+"?access-token="+apiKeyGorest, values)
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Your record has been changed",
                    type: "success",
                    timer: 3000,
            });
            navigate("/users");
        });
    }

    const getUserById = async () => {
        axios.get('https://gorest.co.in/public/v2/users/'+userId+'?access-token='+apiKeyGorest).then((response) => {
            setValues({
                'name': response.data.name,
                'email': response.data.email,
                'gender': response.data.gender,
                'status': response.data.status,
            });
        });
    }

    const formik = useFormik({
        'initialValues': FormValues,
        enableReinitialize: true,
        validationSchema: userFormValidationSchema,
        onSubmit: updateUser
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
                            <option key={option.id} value={option.label} selected={FormValues.gender === option.id}>
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
                            <option value={option.id} selected={FormValues.status === option.id}>
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

export default EditUser
