import React, { Component } from 'react';
import { stringLiteral } from '@babel/types';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: false
    };
  }
  onChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onAddTask = () => {
    console.log(typeof this.state.name);
    if (this.state.name != '') {
      this.props.onAddTask(this.state);
      this.onClearForm();
    }
  };
  onClearForm = () => {
    this.setState({
      name: '',
      status: false
    });
  };
  onCloseForm = () => {
    this.props.onClose();
  };
  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">Thêm Công Việc</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={e => this.onChange(e)}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              defaultValue={this.state.status}
              onChange={e => this.onChange(e)}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => this.onAddTask()}
              >
                Thêm
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.onCloseForm()}
              >
                Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskForm;
