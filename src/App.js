
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from "./components/login";
import Register from "./components/register";
import Todos from "./components/todos";
import TasksCalender from "./components/eventCalender";
function App() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to={'/calender'} />} />
        <Route path='/todos' element={<Todos/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/calender' element={<TasksCalender />}/>
    </Routes>

  );
}

export default App;
