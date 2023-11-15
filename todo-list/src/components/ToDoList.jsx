import { useState, useEffect } from 'react';
import axios from 'axios';

function ToDoList() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		fetch('http://localhost:3000/data', { mode: 'cors' })
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
        setTasks(data);
      }
			)
			.catch((error) => console.error('Error:', error));
	}, []);

  const addData = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/AddData', data);
    console.log('Data added successfully:', response.data);
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

const addTask = () => {
  const newTask = document.querySelector('input').value;
  addData({ name: newTask, id: tasks.length + 1 });
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
							{task.name}
							<button onClick={() => deleteTask(index)}>Delete</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ToDoList;
