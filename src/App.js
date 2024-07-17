import React, { Component } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm.js';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'all',
      sort: 'date'
    };
  }

  componentDidMount() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    this.setState({ tasks: storedTasks });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.tasks !== this.state.tasks) {
      localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }
  }

  addTask = (task) => {
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, task]
    }));
  };

  editTask = (updatedTask) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  };

  deleteTask = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  setSort = (sort) => {
    this.setState({ sort });
  };

  filterTasks = (tasks) => {
    const { filter } = this.state;
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks;
  };

  sortTasks = (tasks) => {
    const { sort } = this.state;
    return tasks.sort((a, b) => {
      if (sort === 'date') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sort === 'title') {
        return a.title.localeCompare(b.title);
      }
      return tasks;
    });
  };

  render() {
    let { tasks } = this.state;
    tasks = this.filterTasks(tasks);
    tasks = this.sortTasks(tasks);

    return (
      <div className="app">
        <Header />
        <div className='flex'>
          <TaskForm addTask={this.addTask} />
          <div className='tasklist'>
            <Filter setFilter={this.setFilter} setSort={this.setSort} />
            {tasks.length === 0 ? (
              <p>Список задач пуст</p>
            ) : (
              <TaskList tasks={tasks} editTask={this.editTask} deleteTask={this.deleteTask} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
