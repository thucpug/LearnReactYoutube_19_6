import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: '',
      filterStatus: -1
    };
  }
  onChange = e => {
    var target = e.target;
    var value = target.value;
    var name = target.name;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });

    console.log(this.state);
  };
  render() {
    var mapTaskItem = this.props.tasks.map((val, index) => {
      return (
        <TaskItem
          key={val.id}
          task={val}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onEdit={this.props.onEdit}
        />
      );
    });
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.filterName}
                  name="filterName"
                  onChange={e => this.onChange(e)}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={this.state.filterStatus}
                  name="filterStatus"
                  onChange={e => this.onChange(e)}
                >
                  <option value={-1}>Tất Cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích Hoạt</option>
                </select>
              </td>
              <td />
            </tr>

            {mapTaskItem}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TaskList;
