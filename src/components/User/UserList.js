import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const UserList = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {userId} = useParams();

    useEffect (() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('https://gorest.co.in/public/v2/users?access-token='+apiKeyGorest).then((response) => {
            setUsers(response.data);
        });
    }

    const deleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('https://gorest.co.in/public/v2/users/'+userId+'?access-token='+apiKeyGorest)
                .then(() => {
                    fetchData();
                    Swal.fire({
                        title: "Success!",
                        text: "Your record has been deleted",
                        type: "success",
                        timer: 2000,
                    });
                });
            }
        })
    }

    function renderUserStatus(status) {
        if (status == "active"){
            return "Active";
        }else {
            return "In-Active";
        }
    }

    function renderGender(gender) {
        if (gender == "male"){
            return "Male";
        }else {
            return "Female";
        }
    }

    return (
        <div>
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="has-text-centered">Gender</th>
                        <th className="has-text-centered">Status</th>
                        <th className="has-text-centered">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.id}>
                        <td>{ index+1 }</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="has-text-centered">{renderGender(user.gender)}</td>
                        <td className="has-text-centered">{renderUserStatus(user.status)}</td>
                        <td className="has-text-centered">
                            <Link to={"/users/edit/" + user.id} className="button is-small is-info">Edit</Link>
                            <button onClick={() => deleteUser(user.id)} className="button is-small is-danger">Delete</button>
                            <Link to={"/users/"+user.id+"/todos/"} className="button is-small is-link">TODO</Link>
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    )
}
export default UserList
