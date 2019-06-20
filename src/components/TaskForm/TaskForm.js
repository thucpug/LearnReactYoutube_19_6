import React, { Component } from 'react';
import { stringLiteral } from '@babel/types';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
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
  componentWillMount() {
    console.log(this.props.editTask);
    if (this.props.editTask !== null) {
      this.setState({
        id: this.props.editTask.id,
        name: this.props.editTask.name,
        status: this.props.editTask.status
      });
    }
  }
  componentWillReceiveProps(nextprops) {
    console.log(nextprops);
    if (nextprops.editTask && nextprops) {
      this.setState({
        id: nextprops.editTask.id,
        name: nextprops.editTask.name,
        status: nextprops.editTask.status
      });
    }
  }

  onAddTask = () => {
    if (this.state.name != '') {
      if (this.props.editTask && this.props.editTask.id != null) {
        this.props.editTask.name = this.state.name;
        this.props.editTask.status = this.state.status;
        console.log(this.props.editTask);
        this.props.onAddTask(this.props.editTask);
        this.onClearForm();
      } else {
        this.props.onAddTask(this.state);
        console.log(this.state);
        this.onClearForm();
        this.onCloseForm();
      }
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
    var { id } = this.state;
    console.log(id);

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id != null ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
          </h3>
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
              name="status"
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
                {id != null ? 'Lưu Lại' : 'Thêm'}
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
