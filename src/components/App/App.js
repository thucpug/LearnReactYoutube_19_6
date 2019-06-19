import React, { Component } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import Controlls from '../Controlls/Controlls';
import TaskList from '../TaskList/TaskList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false
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
  };
  onAddTask = data => {
    data.id = 4;
    var { tasks } = this.state;
    tasks.push(data);
    this.setState({ tasks: tasks });
    localStorage.setItem('data', JSON.stringify(this.state.tasks));
    console.log(this.state);
  };
  onCloseForm = () => {
    this.setState({ isDisplayForm: !this.state.isDisplayForm });
  };
  render() {
    var { tasks, isDisplayForm } = this.state;
    var toggleFormAdd = isDisplayForm ? (
      <TaskForm onAddTask={this.onAddTask} onClose={() => this.onCloseForm()} />
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
                  <TaskList tasks={tasks} />
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
