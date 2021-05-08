import React, { Component } from 'react'
import TaskItem from './TaskItem'

export default class Tasklist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    onChange = (e)=> {
        
        var target = e.target;
        var name = target.name
        var value = target.value
        this.props.onFilter(
            name === 'filterName' ? value: this.state.filterName,
            name === 'filterStatus' ? value: this.state.filterStatus
        )
        this.setState({
            [name] : value 
        })
    }
    render() {
        var {tasks} = this.props
        var {filterName, filterStatus} = this.state
        var elmtask = tasks.map((task, index)=> {
            return <TaskItem key ={task.id} index = {index} task = {task} onUpdateStatus = {this.props.onUpdateStatus} onDelete = {this.props.onDelete} onEdit = {this.props.onEdit}/>
        })
        return (
            <div>
                <table className = "table table-bodered table-hover mt-15">
                    <thead>
                        <tr>
                            <th className = "text-center"> STT</th>
                            <th className = "text-center"> Name</th>
                            <th className = "text-center"> Status</th>
                            <th className = "text-center"> Time</th>
                            <th className = "text-center"> Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" className = "form-control" name = "filterName" value = {filterName} onChange = {this.onChange}/>
                            </td>
                            <td>
                                <select className = "form-control" name ="filterStatus" value = {filterStatus} onChange = {this.onChange}> 
                                <option value = {-1}>All</option>
                                <option value = {0}>Hidden</option>
                                <option value = {1}>Activated</option></select>
                            </td>
                            <td></td>
                        </tr>
                        {elmtask}
                    </tbody>
                </table>
            </div>
        )
    }
}
