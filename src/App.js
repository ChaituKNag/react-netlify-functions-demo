import React, { useEffect, useState } from 'react';
import {
  Menu,
  Container,
  Header,
  Checkbox,
  List,
  Icon,
  Form,
  Button
} from 'semantic-ui-react';
import { API_PATH } from './constants';
import axios from 'axios';
import { useAuth0 } from './auth0';

function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    username: '',
    title: '',
    description: '',
    date: new Date()
  });

  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  const getLatestTodos = () => {
    axios.get(`${API_PATH}/todos`)
      .then(res => {
        setTodos(() => res.data);
      })
  }

  const handleCompleteTodo = (id) => (e, data) => {
    const completed = data.checked;
    axios.post(`${API_PATH}/todos/${id}`, {
      completed
    })
      .then(res => {
        setTodos(oldTodos => oldTodos.map(
          todo => ({
            ...todo,
            completed: todo._id === id ? !todo.completed : todo.completed
          }
          )
        ));
      })
  }

  const handleTodoDelete = (id) => (e) => {
    e.stopPropagation();
    axios.delete(`${API_PATH}/todos/${id}`)
      .then(res => {
        setTodos(oldTodos => oldTodos.filter(todo => (
          todo._id !== id
        )));
      })
  }

  const handleInputChange = (fieldName) => (e) => {
    const { value } = e.target;
    setNewTodo(oldValue => ({
      ...oldValue,
      [fieldName]: value
    }));
  }

  const handleDateChange = (e) => {
    const { value } = e.target;
    setNewTodo(oldValue => ({
      ...oldValue,
      date: new Date(value)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('new todo', newTodo);
    axios.post(`${API_PATH}/todos`, newTodo)
      .then(res => {
        getLatestTodos();
        setNewTodo({
          username: '',
          title: '',
          description: '',
          date: new Date()
        });
      });
  }

  useEffect(() => {
    getLatestTodos();
  }, []);

  const handleLogin = () => loginWithRedirect({});
  const handleLogout = () => logout();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Menu>
        <Menu.Item header>Todos Home</Menu.Item>
        {!isAuthenticated && <Menu.Item onClick={handleLogin}>Log in</Menu.Item>}
        {isAuthenticated && <Menu.Item onClick={handleLogout}>Log out</Menu.Item>}
      </Menu>
      <Container text>
        <Header as="h2">All todos</Header>
        <List>
          {
            todos.map(todo => (
              <List.Item key={todo._id}><Checkbox defaultChecked={todo.completed} onChange={handleCompleteTodo(todo._id)} label={
                <label>
                  {todo.title}
                  <Icon name="trash alternate" color="red"
                    onClick={handleTodoDelete(todo._id)}
                  />
                </label>
              } />
              </List.Item>
            ))
          }
        </List>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Header as="h3">Add a new todo:</Header>
          <Form.Field>
            <label>Title:</label>
            <input value={newTodo.title} onChange={handleInputChange('title')} />
          </Form.Field>
          <Form.Field>
            <label>Description:</label>
            <input value={newTodo.description} onChange={handleInputChange('description')} />
          </Form.Field>
          <Form.Field>
            <label>Date:</label>
            <input type="date" onChange={handleDateChange} />
          </Form.Field>
          <Form.Field>
            <label>Username:</label>
            <input value={newTodo.username} onChange={handleInputChange('username')} />
          </Form.Field>
          <Button primary type='submit'>Create todo</Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
