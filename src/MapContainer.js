import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from "react";
import './App.css';
import iconBlue from './blue-dot.png'
import iconYellow from './yellow-dot.png'

const MAP_KEY = process.env.REACT_APP_API_KEY_MAP;

 
export class MapContainer extends Component {
    
  getLocation = (id) => {this.props.locations.filter((loc) => loc.id === id)};

  

  

  render() {
  const showingLocations = this.props.showingLocations;
  const locations = this.props.locations;
  console.log(MAP_KEY);   
      
  const style = {
    width: '100vw',
    height: '50vh',
    position: 'relative'
  }
      
  //making bounds based on locations
  let bounds = new this.props.google.maps.LatLngBounds();
  for (let i = 0; i < locations.length; i++) {
    bounds.extend(locations[i].location)
  }

  // get selectedLocation for InfoWindow making
  const selectedLocation = this.props.showingLocations.filter((loc) => loc.id === this.props.selectLocationId)[0];
   
  // check if map is loaded
  if (!this.props.loaded) {
    
  return <div>Loading...</div>
  }
    return (

      
    <div className='map' role= 'application' tabIndex='0'>
      
    <Map 
        
        google={this.props.google}
        bounds={bounds}
        initialCenter={{
            lat: 51.1272097,
            lng: 16.8517807
          }}
          zoom={5}
          containerStyle={{
            height: '50vh',
            position: 'relative',
            width: '100%'
          }}
          style={style}
          styles = {[
            {"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#daa520"}]},
            {"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},
            {"lightness":13}]},
            {"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
            {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},
            {"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},
            {"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},
            {"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
            {"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},
            {"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},
            {"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},
            {"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},
            {"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},
            {"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]} >


      {showingLocations && showingLocations.map((loc) =>  <Marker
      key={loc.id}
      title={loc.name}
      name={loc.name}
      position={loc.location}
      onClick={this.props.onMarkerClick}
      ref={"marker" + loc.id}
      icon = {this.props.selectLocationId === loc.id? iconBlue: iconYellow}
    />   
  )}

      {
    //if any selectedLocation generate Infowindow on selectedLocation position
      this.props.selectLocationId  && <InfoWindow
    
      visible={this.props.showingInfoWindow}
      onClose={this.props.windowHasClosed}
      marker = {this.refs["marker" + this.props.selectLocationId].marker}
      >
      <div className='infowindow'>
        <h3>{selectedLocation.name}</h3>
        <span>Lat. {selectedLocation.location.lat} </span>
        <span>Lng. {selectedLocation.location.lng}</span>

        
      </div>
      </InfoWindow>
      }
    </Map>
    </div>
      )
    }
  }
 
export default GoogleApiWrapper({
  apiKey: `${MAP_KEY}`
})(MapContainer)