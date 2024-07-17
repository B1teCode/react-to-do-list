import React, { Component } from 'react';
import 'boxicons';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            title: props.task.title,
            description: props.task.description,
            dueDate: props.task.dueDate
        };
    }

    toggleComplete = () => {
        const updatedTask = { ...this.props.task, completed: !this.props.task.completed };
        this.props.editTask(updatedTask);
    };

    handleEdit = () => {
        const { title, description, dueDate } = this.state;
        const updatedTask = { ...this.props.task, title, description, dueDate };
        this.props.editTask(updatedTask);
        this.setState({ isEditing: false });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { task, deleteTask } = this.props;
        const { isEditing, title, description, dueDate } = this.state;

        return (
            <div className="task">
                {isEditing ? (
                    <div className='isEditing'>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                        <textarea
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                        ></textarea>
                        <input
                            type="date"
                            name="dueDate"
                            value={dueDate}
                            onChange={this.handleChange}
                        />
                        <button onClick={this.handleEdit}>Save</button>
                    </div>
                ) : (
                    <div className='taskinf'>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p className='dueDate'><box-icon type='solid' name='hourglass' color='#ffdab1'></box-icon>{task.dueDate}</p>
                        <label className='container'>Completed
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={this.toggleComplete}
                            /> <span class="checkmark"></span>
                        </label>
                        <button onClick={() => this.setState({ isEditing: true })}> <span>Edit<box-icon type='solid' name='edit-alt' color='#2e44ff'></box-icon></span></button>
                        <button onClick={() => deleteTask(task.id)}> <span>Delete<box-icon type='solid' name='trash-alt' color='#2e44ff'></box-icon></span></button>
                    </div>
                )}
            </div>
        );
    }
}

export default Task;
