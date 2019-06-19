import React from 'react';
import TaskForm from '../TaskForm/TaskForm';
import Controlls from '../Controlls/Controlls';
import TaskList from '../TaskList/TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
              {/* form add work */}
              <TaskForm />
            </div>
            <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
              <button type="button" className="btn btn-primary">
                <span className="fa fa-plus mr-5" />
                Thêm Công Việc
              </button>
              <div className="row mt-15">
                <Controlls />
              </div>
              <div className="row mt-15">
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
