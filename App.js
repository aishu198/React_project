import React, {useState,useEffect} from 'react';
import './App.css';
//importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //usestate
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once WHEN THE APP STARTS
  useEffect(() =>{
    getlocalTodos();
  }, []);
  //useEffect
  useEffect(() => {
    filterHandler();
    savelocalTodos();
    // eslint-disable-next-line
  }, [todos,status]);
  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  
  //save to local
  const savelocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const getlocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todolocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todolocal);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>TO DO LIST</h1>
      </header>
      <Form 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
