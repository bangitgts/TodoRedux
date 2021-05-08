import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {v1 as uuid} from "uuid";
import Addform from './components/Addform';
import Tasklist from './components/Tasklist'
import Control from './components/Control'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      isdisplayedForm: false,
      taskEditting: '',
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'default',
      sortValue: 1,
    }
  }
  componentDidMount() {
    if (localStorage && localStorage.getItem('tasks')){
      var tasks =  JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      })
    }
  }

  toggleForm = () => {
    if(this.state.isdisplayedForm && this.state.taskEditting !== '') {
      this.setState({
        isdisplayedForm: true,
        taskEditting:''
      })
    } else {
      this.setState({
        isdisplayedForm: !this.state.isdisplayedForm,
        taskEditting: ''
      })
    }
  }

  onCloseForm = () => {
    this.setState({
      isdisplayedForm: false
    })
  }

  onShowForm = () => {
    this.setState({
      isdisplayedForm: true
    })
  }

  onSubmit = (data) => {
    console.log(data.date, data.time)
    var {tasks} = this.state;
    if (data.id !== '') {
      if(data.status === "true"){
        data.status = true
      }
      else {
        data.status = false
      }
      var index = this.findIndex(data.id)
      tasks[index] = data
      this.onCloseForm()
    }
    else {
      data.id = uuid();
      tasks.push(data)
    }
    this.setState({
      tasks: tasks,
      taskEditting: ''
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  onUpdateStatus = (id)=>{
    var {tasks} = this.state
    var index = this.findIndex(id)
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    
  }
  findIndex= (id)=> {
    var {tasks} = this.state
    var result = -1;
    tasks.forEach((task, index) => {
      if(task.id === id) {
        result = index;
      }
    })
    return result
  }
  onDelete = (id)=> {
    var {tasks} = this.state
    var index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm()
  }
  onEdit = (id)=> {
    var {tasks} = this.state
    var index = this.findIndex(id)
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    })
    this.onShowForm();
  }
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    })
  }
  onClear = () => {
    this.setState({
      keyword: ''
    })
  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
  }
  onDeleteAll = () => {
    var {tasks} = this.state
    tasks = []
    this.setState({
      tasks: tasks
    })
    console.log(tasks)
    localStorage.clear()
  }
  render() {
    var {tasks, isdisplayedForm, taskEditting, filter, keyword, sortBy, sortValue} = this.state
    console.log(tasks)
    if(filter){
      if(filter.name){
        tasks = tasks.filter(task=>task.name.toLowerCase().indexOf(filter.name) !== -1)
      }
      tasks = tasks.filter(task => {
        if(filter.status === -1){
          return task
        }
        else {
          return task.status === (filter.status === 1 ? true: false)
        }
      })
    }
    if(sortBy === 'name') {
      tasks.sort((a, b)=> {
        if(a.name.toLowerCase() > b.name.toLowerCase()) return sortValue
        else if (a.name.toLowerCase()< b.name.toLowerCase()) return -sortValue
        else return 0
      })
    }
    else if(sortBy === 'status') {
      tasks.sort((a, b)=> {
        if(a.status > b.status) return -sortValue
        else if (a.status< b.status) return sortValue
        else return 0
      })
    }
    
    if(keyword) {
      tasks = tasks.filter(task=>task.name.toLowerCase().indexOf(keyword) !== -1)
    }
    var elmTaskForm = isdisplayedForm ? <Addform taskEditting = {taskEditting} onSubmit = {this.onSubmit} onCloseForm = {this.onCloseForm}/>: '';
    return (    
      <div className="container">
        <div className = "text-center text-capitalize mt-2 mb-2"> <h1>to do list</h1></div>
        <div className ="row">
          <div className = {isdisplayedForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4": ''}>
            {elmTaskForm}
          </div>
          <div className = {isdisplayedForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8": "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type ="button" className = "btn btn-primary text-capitalize mr-2" onClick = {this.toggleForm}><span className = "fa fa-plus mr-2"> </span>add work</button>
            <Control onSearch = {this.onSearch} onClear = {this.onClear} onSort = {this.onSort} sortBy = {sortBy} sortValue = {sortValue}/>
            <Tasklist tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDelete = {this.onDelete} onEdit = {this.onEdit} onFilter = {this.onFilter}/>
          </div> 
        </div>
        {tasks.length !== 0 ? <div className="row justify-content-center">
            <div className="col-3 text-center">
              <button type ="button" className = "btn btn-danger btn-lg text-capitalize mr-2" onClick = {this.onDeleteAll}>
                <span className = "fa fa-trash mr-2"> </span>
                DELETE ALL</button>
            </div>
        </div>: ''}
      </div>
    );
  }
}

export default App;
