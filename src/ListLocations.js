import React, { Component } from 'react'
import './App.css'

class ListLocations extends Component {

    handleClick = (e, loc) => {
        e.preventDefault()
        if (this.props.onListClick)
            this.props.onListClick(loc)
    }

    handleSubmit = (e, value) => {
        e.preventDefault()
        if (this.props.updateQuery)
        this.props.updateQuery(value)
        console.log(value)
    }
      
    render() {
        let showingLocations = this.props.showingLocations;
        let locations = this.props.locations
        
        return (
        <div>
          <div className ='search-container'>
            <input
                className='search-locations'
                type='text'
                placeholder='Search locations'
                value={this.props.query}
                onChange={(e) => this.handleSubmit(e, e.target.value) }
                tabIndex='2'
            /> 
            {showingLocations.length !== locations.length && (
                <div className='showing-locations'>
                <span>Now showing {showingLocations.length} of {locations.length}</span>
                    <button onClick={this.props.clearQuery}>Show all</button>
                </div>
            )}
          </div>  
          <ul className='location-list' aria-label='List of towns'>
            {showingLocations.map((loc) => (  
            <li key={loc.id} onClick={e => this.handleClick(e, loc)} className='location-list-item' aria-label={loc.name} tabIndex='2'> 
              {loc.name.toString()}
            </li>
           
            ))}
          </ul>      
      </div>
    );
  }
}

    export default ListLocations