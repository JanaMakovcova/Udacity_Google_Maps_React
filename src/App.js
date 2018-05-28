import React, { Component } from 'react';
import './App.css';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './MapContainer'
import ListLocations from './ListLocations'
import SplashPicture from './SplashPicture'

class App extends Component {
  state = {
    query: '',
    showingInfoWindow: false,
    selectLocationId: '',
    locations: [
      { 
        "id": "1",
        "name": "Prague", 
        "location": {"lat": 50.0598058, "lng": 14.3255405},
      },
      { "id": "2",
        "name": "Vienna", 
        "location": {"lat": 48.2208286, "lng": 16.2399763} },
      { "id": "3",
        "name": "Bratislava", 
        "location": {"lat": 48.1359244, "lng": 16.9758334} },
      { "id": "4",
      "name": "Berlin", 
      "location": {"lat": 52.5069312, "lng": 13.1445515} },
      { "id": "5",
      "name": "Warsaw", 
      "location": {"lat": 52.2330653, "lng": 20.921111} }
    ]
  };

  onMarkerClick = (props, marker, e) => {
    const locId = this.getId(props.position);
      this.setState({
        selectLocationId: locId, 
        showingInfoWindow: false
        }, () => {this.setState({showingInfoWindow: true});
      });   
  }
  // change state when InfoWindow is closed
  windowHasClosed = (props) => {
    console.log('window has closed')
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        selectLocationId: '',
      })
    }
  }

    //return Id of location from it's position 
  getId = (locationClicked) => {
    let location = this.state.locations.filter((loc) => loc.location === locationClicked);
    //location is array of 1 object, so to reach filtered object I have to choose [0] from arrray
    return location[0].id
  }

  onListClick = (loc) => {
    this.setState({selectLocationId: loc.id, showingInfoWindow: false}, () => {
      this.setState({showingInfoWindow: true});
    });  
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    }

  clearQuery = (query) => {
    this.setState({query: ''})
  }

  render() {
    let locations = this.state.locations;
    let query = this.state.query;
    let showingLocations;
    let selectID = this.state.selectLocationId;
    let selectTown;

    if (this.state.selectLocationId) {
    let select = locations.filter((loc) => loc.id === selectID)
    //get name of town
    selectTown = select[0].name
    } else selectTown = '';

    //if there is any query, filter locations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingLocations = locations.filter((lc) => match.test(lc.name));
    } else {
      showingLocations = locations; 
    }

    // sort location by name of it
    showingLocations.sort(sortBy('name'));

    return (
      <main>
        <ListLocations
        onListClick={this.onListClick} 
        showingLocations ={showingLocations}
        locations = {this.state.locations}
        showingInfoWindow ={this.state.showingInfoWindow} 
        selectLocationId = {this.state.selectLocationId}
        updateQuery={this.updateQuery}
        clearQuery={this.clearQuery}
        query={this.state.query}
        />
        <MapContainer 
        onMarkerClick={this.onMarkerClick}
        windowHasClosed={this.windowHasClosed} 
        showingLocations = {showingLocations}
        locations = {this.state.locations}
        showingInfoWindow ={this.state.showingInfoWindow} 
        selectLocationId = {this.state.selectLocationId}
        />
        <SplashPicture 
        selectLocationId = {this.state.selectLocationId}
        locations = {this.state.locations}
        selectTown = {selectTown}
        />
      </main>
    );
  }
}

export default App;

