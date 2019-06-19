import React, { Component } from 'react';

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };
  onEdit =()=>{
    this.props.onEdit(this.props.task.id);
  }
  render() {
    var { task } = this.props;

    return (
      <tr>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            className={
              task.status ? 'label label-success' : 'label label-danger'
            }
            onClick={this.onUpdateStatus}
          >
            {task.status ? 'Kich Hoat' : 'Khoa'}
          </span>
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning" onClick ={this.onEdit}>
            <span className="fa fa-pencil mr-5" />
            Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.onDelete}
          >
            <span className="fa fa-trash mr-5" />
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
