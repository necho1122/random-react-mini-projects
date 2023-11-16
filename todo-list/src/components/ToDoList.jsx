import { useState } from 'react';
import axios from 'axios';

function ToDoList() {
	const [tasks, setTasks] = useState([]);

	fetch('http://localhost:3000/data', { mode: 'cors' })
		.then((response) => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then((data) => {
			setTasks(data);
		})
		.catch((error) => console.error('Error:', error));

	const addData = async (data) => {
		try {
			const response = await axios.post('http://localhost:3000/AddData', data);
			console.log('Data added successfully:', response.data);
		} catch (error) {
			console.error('Error adding data:', error);
		}
	};

	const deleteData = async (id) => {
		axios
			.delete(`http://localhost:3000/DeleteData?id=${id}`)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const addTask = () => {
		let newTask = document.querySelector('input').value;
		addData({ name: newTask, id: tasks.length + 1 });
		document.querySelector('input').innerHTML = '';
	};

	const deleteTask = (id) => {

		deleteData(id);
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
							<button
								id='delete-button'
								onClick={() => deleteTask(task.id)}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default ToDoList;
