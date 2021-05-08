import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props){
        super(props)    
        this.state = {
            keyword: ''
        }
    }
    onChange=(e)=> {
        var target = e.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }
    onClear = () => {
        this.setState({
            keyword: ''
        })
        this.props.onClear()
    }
    render() {
        var {keyword} = this.state;
        return (
            <div className = "col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className = "input-group">
                    <input name= "keyword" type = "text" className ="form-control mr-2" placeholder = "Input Keyword" value = {keyword} onChange = {this.onChange}/>
                    <span className = "input-group-btn" >
                        <button className = "btn btn-primary mr-2" type = "button" onClick = {this.onSearch}>
                            <span className = "fa fa-search mr-2"></span>
                            Search
                        </button>
                        <button className = "btn btn-danger" type ="button" onClick = {this.onClear}>Clear</button>
                    </span>
                </div>

                
            </div>
        )
    }
}
