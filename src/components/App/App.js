import React, { Component } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import Controlls from '../Controlls/Controlls';
import TaskList from '../TaskList/TaskList';
import { validate } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editTask: null,
      isDisplayForm: false,
      filter: {
        name: '',
        status: -1
      }
    };
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('data') != null) {
      this.setState({ tasks: JSON.parse(localStorage.getItem('data')) });
    }
  }
  onTaolocalstorage = event => {
    var tasks = [
      {
        id: 1,
        name: 'hoc reactjs',
        status: true
      },
      {
        id: 2,
        name: 'hoc angular 7',
        status: true
      },
      {
        id: 3,
        name: 'hoc redux',
        status: false
      }
    ];

    this.setState({ tasks: tasks });
    localStorage.setItem('data', JSON.stringify(this.state.tasks));
  };
  onremovelocalstorage = e => {
    localStorage.removeItem('data');
  };
  onAddTaskForm = e => {
    var check = !this.state.isDisplayForm;
    this.setState({ isDisplayForm: check });
    this.setState({
      editTask: null
    });
  };
  onAddTask = data => {
    console.log(data);
    var { tasks } = this.state;
    if (data.id !== null) {
      tasks.forEach((val, index) => {
        if (val.id === data.id) {
          tasks[index] = data;
        }
        this.setState({ tasks: tasks });
        localStorage.setItem('data', JSON.stringify(this.state.tasks));
        console.log(this.state);
      });
    } else {
      data.id = Math.floor(Math.random() * 100);
      tasks.push(data);
      this.setState({ tasks: tasks });
      localStorage.setItem('data', JSON.stringify(this.state.tasks));
      console.log(this.state);
    }
  };
  onUpdateStatus = data => {
    var { tasks } = this.state;
    for (const item of tasks) {
      if (item.id === data) {
        item.status = !item.status;
      }
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('data', JSON.stringify(this.state.tasks));
  };
  onDelete = data => {
    console.log(data);

    var { tasks } = this.state;
    tasks.forEach((value, index) => {
      if (value.id === data) {
        tasks.splice(index, 1);
      }
    });
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('data', JSON.stringify(this.state.tasks));
  };
  onEdit = data => {
    console.log(data);
    this.onShowForm();
    var { tasks } = this.state;
    for (const task of tasks) {
      if (task.id == data) {
        var editItem = task;
        console.log(editItem);
        this.setState({
          editTask: task
        });
      }
    }
    console.log(this.state.editTask);
  };
  onFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName,
        status: parseInt(filterStatus)
      }
    });
  };
  onShowForm = () => {
    this.setState({ isDisplayForm: true });
  };
  onCloseForm = () => {
    this.setState({ isDisplayForm: !this.state.isDisplayForm });
  };
  render() {
    var { tasks, isDisplayForm, filter } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter(task => {
        if (filter.status === -1) {
          return tasks;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    var toggleFormAdd = isDisplayForm ? (
      <TaskForm
        onAddTask={this.onAddTask}
        onClose={() => this.onCloseForm()}
        editTask={this.state.editTask}
      />
    ) : (
      ''
    );
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <div className="text-center">
              <h1>Quản Lý Công Việc</h1>
              <hr />
            </div>
            <div className="row">
              <div
                className={
                  toggleFormAdd ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''
                }
              >
                {/* form add work */}
                {toggleFormAdd}
              </div>
              <div
                className={
                  toggleFormAdd
                    ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                    : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
                }
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={e => this.onAddTaskForm(e)}
                >
                  <span className="fa fa-plus mr-5" />
                  Thêm Công Việc
                </button>

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={e => this.onTaolocalstorage(e)}
                >
                  <span className="fa fa-plus mr-5" />
                  Tạo localstorage
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={e => this.onremovelocalstorage(e)}
                >
                  <span className="fa fa-plus mr-5" />
                  Remove localstorage
                </button>
                <div className="row mt-15">
                  <Controlls />
                </div>
                <div className="row mt-15">
                  <TaskList
                    tasks={tasks}
                    onUpdateStatus={this.onUpdateStatus}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    onFilter={this.onFilter}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
