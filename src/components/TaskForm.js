import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      dueDate: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, dueDate } = this.state;
    if (!title || !dueDate) {
      this.setState({ error: 'Title and due date are required.' });
      return;
    }
    this.props.addTask({ id: Date.now(), title, description, dueDate, completed: false });
    this.setState({ title: '', description: '', dueDate: '', error: '' });
  };

  render() {
    const { title, description, dueDate, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        ></textarea>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={this.handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
    );
  }
}

export default TaskForm;
