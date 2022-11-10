import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Link, Routes, useParams} from 'react-router-dom';

import Header from './components/Content/Header';
import Footer from './components/Content/Footer';
import UserList from './components/User/UserList';
import AddUser from './components/User/AddUser';

import EditUser from './components/User/EditUser';
import TodoList from './components/Todo/TodoList';
import AddTodo from './components/Todo/AddTodo';
import EditTodo from './components/Todo/EditTodo';
  
function App() {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={
            <div>
              <p className="title is-4" style={{marginTop: '30px'}}> Welcome to this website!</p>
              <p>This is a simple website built using ReactJS using an external API <a href="https://gorest.co.in/"> gorest.co.in</a>. Thanks for Go REST for making the free API for testing. </p>
              <p> To start this app, you have to run: </p>
              <ul>
                <li>1. npm install</li>
                <li>2. Go to <a href="https://gorest.co.in/">Go REST</a> and create your account.</li>
                <li>3. After creating your account, you need to fill the api key on .env file</li>
              </ul>
            </div>
        } />

        <Route path="users/">
          <Route path="edit/:userId" element={<EditUser />} />
          <Route path=":userId/todos/" element={<TodoList />} />
          <Route path="" element={<UserList />} />
          <Route path="add/" element={<AddUser />} />
        </Route>

        <Route path="todos/">
          <Route path="edit/:idTodo" element={<EditTodo />} />
          <Route path="" element={<TodoList />} />
          <Route path="add/" element={<AddTodo />} />
        </Route>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
