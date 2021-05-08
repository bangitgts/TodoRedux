import React, { Component } from 'react'
import './index.css'
export default class Sort extends Component {
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.sortBy, nextProps.sortValue)
    }
    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue)
    }
    render() {
        return (
            <div className = "col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort
                </button>
                <div className="dropdown-menu" aria-labelledby = "dropdownMenu1">
                    <button className={(this.props.sortBy === 'default' && this.props.sortValue === 1) ? "dropdown-item sort-selected": "dropdown-item"} onClick ={()=> this.onClick('default', 1)}>
                        Default</button>
                    <button className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? "dropdown-item sort-selected": "dropdown-item"} onClick ={()=> this.onClick('name', 1)}>
                        <span className = "fa fa-sort-alpha-asc"></span> Name A-Z</button>
                    <button className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? "dropdown-item sort-selected": "dropdown-item"} onClick ={()=> this.onClick('name', -1)}>
                        <span className = "fa fa-sort-alpha-desc"></span> Name Z-A</button>
                    <div className="dropdown-divider"></div>
                    <button className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? "dropdown-item sort-selected": "dropdown-item"} onClick ={()=> this.onClick('status', 1)}>Activated</button>
                    <button className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? "dropdown-item sort-selected": "dropdown-item"} onClick ={()=> this.onClick('status', -1)}>Hidden</button>
                </div>
            </div>
            </div>
            
        )
    }
}
