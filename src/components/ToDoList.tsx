import React, { useEffect, useState } from 'react';

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>(() => {
    // Initialize tasks from local storage or use default tasks
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : ["Eat breakfast", "Take a shower", "Walk the dog"];
  });
  const [newTask, setNewTask] = useState<string>("");
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    // Initialize tasks from local storage or use default tasks
    const storedCTasks = localStorage.getItem('completedTaks');
    return storedCTasks ? JSON.parse(storedCTasks) : [];
  });


  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks]);
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }
  

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask("");
    }
  }

  function completeTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const completedTask = tasks[index];
    setTasks(updatedTasks);
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, completedTask]);
  }
    

  function deleteTask(index: number) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index: number) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index: number) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);


  return (
    <div className="to-do-list">
      <div className="todoTitle"><h1>To-Do List</h1></div>
      <div>
        <input
          type="text"
          placeholder="Enter a task.."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="complete-button" onClick={()=>completeTask(index)}>
              Complete
            </button>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              ⬆️
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              ⬇️
            </button>
          </li>
        ))}
        {completedTasks.map((completedTasks, index) => (
          <li key={index}>
            <span className="Ctext">{completedTasks}</span>
          </li>
        ))}
        
      </ol>
      <p>Enjoy!</p>
    </div>
  );
}