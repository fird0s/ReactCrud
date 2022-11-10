import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Swal from "sweetalert2";
    
const TodoList = () => {
    const apiKeyGorest = process.env.REACT_APP_GOREST_TOKEN;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [todos, setTodos] = useState([]);
    
    const navigate = useNavigate();
    const {userId} = useParams();    

    useEffect (() => {
        fetchData();
    }, []);


    function renderProfileOner() {
        if (userId === undefined){
            return <div>
                <h3 className="title is-5">All Task</h3>
            </div>;
        }else{
            return <div>
                <h3 className="title is-5">{name}'s Todo - {email}</h3>
            </div>;
        }
    }

    const deleteTodo = (id) => {
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
                axios.delete('https://gorest.co.in/public/v2/todos/'+id+'?access-token='+apiKeyGorest)
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

    const fetchData = async() => {
        if (userId === undefined){
            axios.get('https://gorest.co.in/public/v2/todos?access-token='+apiKeyGorest)
                .then(response => {
                setTodos(response.data);
            });
        }else {
            axios.get('https://gorest.co.in/public/v2/users/'+userId+'/todos?access-token='+apiKeyGorest)
                .then(response => {
                setTodos(response.data);
            });
            axios.get('https://gorest.co.in/public/v2/users/'+userId+'?access-token='+apiKeyGorest).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
            });
        }
    }


    function renderDate(date) {
        return (moment(date).format('L LTS'));
    }

    return (
        <div>
            { renderProfileOner()}
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>No</th>
                        {/* <th>User</th> */}
                        <th>Title</th>
                        <th>Due</th>
                        <th className="has-text-centered">Status</th>
                        <th className="has-text-centered">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                    <tr key={todo.id}>
                        <td>{ index+1 }</td>
                        {/* <td>{ todo.user_id }</td> */}
                        <td>{ todo.title }</td>
                        <td>{ renderDate(todo.due_on) }</td>
                        <td className="has-text-centered">{ todo.status === 'completed' ? 'Completed' : 'Pending' }</td>
                        <td className="has-text-centered">
                            <Link to={"/todos/edit/" + todo.id} className="button is-small is-info">Edit</Link>
                            <button onClick={() => deleteTodo(todo.id)} className="button is-small is-danger">Delete</button>
                            {/* <Link to={"/users/" + user.id + "/todos"} className="button is-small is-link">TODO</Link> */}
                        </td>
                    </tr>
                    ))}                    
                </tbody>
            </table>
        </div>
    )
}

export default TodoList
