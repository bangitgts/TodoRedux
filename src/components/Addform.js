import React from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Addform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      date: '',
      time: '',
      status: false
    }
  }
  onChange = (e) => {
    var {date, time} = this.state
    date = new Date().toLocaleDateString(); 
    time = new Date().toLocaleTimeString(); 
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value,
      date: date,
      time: time
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state)
    this.onClear();
  }
  onCloseForm = () => {
    this.props.onCloseForm();
  }
  onClear = ( )=> {
    this.setState({
      name: '',
      status: false
    })
  }
  componentDidMount(){
    if(this.props.taskEditting){
      this.setState({
        id: this.props.taskEditting.id,
        name: this.props.taskEditting.name,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: this.props.taskEditting.status
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.taskEditting){
      this.setState({
        id: nextProps.taskEditting.id,
        name: nextProps.taskEditting.name,
        date: nextProps.taskEditting.date,
        time: nextProps.taskEditting.time,
        status: nextProps.taskEditting.status
      })
    }
    if(!nextProps.taskEditting) {
      this.setState({
        id: '',
        name: '',
        status: false
      })
    }
  }
  render() {
    var {id} = this.state;
    return (
      <div className = "panel panel-warning">
        <div className = "panel-heading">
          <h3 className = "panel-title">
            {id !== '' ? "Edit Work": "Add Work"}
            <span className = "fa fa-times-circle ml-10" onClick = {this.onCloseForm}></span>
          </h3>
        </div>
        <div className = "panel-body">
          <form onSubmit = {this.onSubmit}>
            <div className = "form-group">
              <label>Name:</label>
              <input type = "text" className = "form-control" name = "name" value = {this.state.name} onChange = {this.onChange}/>
            </div>
            <label>Status:</label>
            <select className = "form-control" name = "status" value = {this.state.status} onChange = {this.onChange}>
              <option value = {true}>Activate </option>
              <option value = {false}>Hidden </option>
            </select><br/>
            <div className = "text-center">
              <button type = "submit" className = "btn btn-warning"> Add </button> 
              &nbsp;
              <button type = "button" className = "btn btn-danger" onClick ={this.onClear}> Reset </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}