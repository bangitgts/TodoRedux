import React, { Component } from 'react'
import { Badge } from 'reactstrap';
export default class TaskItem extends Component {
    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id)
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }
    onEdit = () => {
        this.props.onEdit(this.props.task.id)
    }
    render() {
        var {task, index} = this.props
        return (
            <tr>
                <td className="text-center">{index+1}</td>
                <td>{task.name}</td>
                <td className ="text-center">
                    <Badge color ={task.status ? "danger":  "primary"} onClick = {this.onUpdateStatus}>{task.status ? "Activated": "Hidden"}</Badge>
                </td>
                <td className ="text-center"> {task.time}<br/>{task.date}</td>
                <td className = "text-center">
                    <button type = "button" className = "btn btn-warning " onClick ={this.onEdit}> <span className = "fa fa-pencil mr-2"></span>Edit</button>
                    &nbsp;
                    <button type = "button" className = "btn btn-danger " onClick ={this.onDelete}> <span className = "fa fa-trash mr-2"></span>Delete</button>
                </td>
            </tr>
        )
    }
}
