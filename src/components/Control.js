import React, { Component } from 'react'
import Sort from './Sort'
import Search from './Search'
import './index.css'
export default class Control extends Component {
    render() {
        return (
            <div className = "row">
            <Search onSearch ={this.props.onSearch} onClear = {this.props.onClear}/>
            <Sort onSort = {this.props.onSort} sortBy = {this.props.sortBy} sortValue = {this.props.sortValue}/>
            </div>
        )
    }
}
