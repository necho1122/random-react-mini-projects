import { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const input = document.querySelector('input');
    const newTask = input.value;
    setTasks([...tasks, newTask]);
    input.value = '';
  };

  const deleteTask = (index) => {
    const newTaskList = [...tasks];
    newTaskList.splice(index, 1);
    setTasks(newTaskList);
  };

  return (
    <div className='container'>
      <img
        src='https://i.ibb.co/fqBcxjn/con-fondo.png'
        alt='logo Nelson Dev'
      />
      <h1>ToDo List</h1>
      <input
        type='text'
        placeholder='Add a task'
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              {task}
              <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
