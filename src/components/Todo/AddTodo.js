import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import moment from 'moment';
import {toDoFormValidationSchema} from '../../schemas';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useFormik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddTodo = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [startDate, setStartDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const status_option  = [
        { id: "pending", label: "Pending" },    
        { id: "completed", label: "Completed" }    
    ]

    useEffect (() => {
        fetchUserData();          
    }, []);    

    const saveTodo = async(values) => {
        axios.post("https://gorest.co.in/public/v2/users/"+values.user_id+"/todos?access-token="+apiKeyGorest, {
                user_id : values.user_id,
                title : values.title,
                due_on: moment(startDate).format(),
                status: values.status
            })
            .then((response) => {
                Swal.fire({
                    title: "Success!",
                    text: "Your new record has been saved",
                    type: "success",
                    timer: 3000,
                });
                navigate("/todos");
        });
    }

    const fetchUserData = async() => {
        axios.get('https://gorest.co.in/public/v2/users/?access-token='+apiKeyGorest)
            .then(response => {
                setUsers(response.data);
        });
    }

    const formik = useFormik({
        'initialValues':{
            'user_id': "",
            'title': "",
            'due_on': "",
            'status': "",
        },
        validationSchema: toDoFormValidationSchema,
        onSubmit: saveTodo
    })

    const renderDateTime = () => {
        return (
            <DatePicker
            name="due_on"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
          />
        );
    };

    return (
        <div className="columns">
            <div className="column is-two-fifths">
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label className="label">Appointed to</label>
                        <div className="control select is-primary">
                            <select id="user_id" onChange={formik.handleChange}>
                                <option selected disabled>Select User</option>
                                {users.map((user) => (
                                <option value={user.id}>
                                    {user.name}
                                </option>
                                ))}
                            </select>
                        </div>
                        {formik.errors.user_id  ? <p className="help is-danger">{formik.errors.user_id}</p> : ""} 
                    </div>     

                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input className={formik.errors.name ? 'input is-danger' : 'input'} id="title" value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" placeholder="Title" />
                        </div>
                        {formik.errors.status  ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                    </div>  

                    <div className="field">
                        <label className="label">Due On </label>
                        <div className="control">
                          {renderDateTime()}
                        </div>
                        {/* {formik.errors.due_on  ? <p className="help is-danger">{formik.errors.status}</p> : ""}  */}
                    </div>     

                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control select is-primary">
                            <select id="status" onChange={formik.handleChange}>
                            <option selected disabled>Select Status</option>
                                {status_option.map((status) => (
                                <option value={status.id}>
                                    {status.label}
                                </option>
                                ))}
                            </select>
                        </div>
                        {formik.errors.status  ? <p className="help is-danger">{formik.errors.status}</p> : ""} 
                    </div>     
                    
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">Save</button>
                            <Link to="/todos" className="button is-info">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTodo
