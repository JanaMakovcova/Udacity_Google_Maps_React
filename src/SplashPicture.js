import React, { Component } from 'react'
import './App.css'

const UNSPLASH = process.env.REACT_APP_API_KEY_UNSPLASH;

class SplashPicture extends Component {
        state = {
            pictures: [],
            error: null,
        }  
  componentWillReceiveProps () {
      let selectTown = this.props.selectTown; 
      fetch(`https://api.unsplash.com/search/photos?page=1&query=${selectTown}`, {
          headers: {
              Authorization: `Client-ID ${UNSPLASH}`
          }
      }).then(response => response.json())
      .then(data => {
          let pictures = data.results.map((pic) => {
              
            return (
              <div key={pic.id}>
              <figure>
                  <a href={pic.urls.small}>
                  <img src={pic.urls.small} alt={selectTown}/>
                  </a>
                  <figcaption className='text-center'>{selectTown} by {pic.user.name}</figcaption>
              </figure>
              </div>
          
            )
          });
          this.setState({pictures: pictures});
          
      }).catch(error => this.setState({ error }));
  }
   
    render() {
      let error = this.state.error;
      if (error) {
          return <p>Error in loading image from Unsplash</p>;
        }
      
      if (this.props.selectLocationId) {
          let randomPicture = this.state.pictures[Math.floor(Math.random()*this.state.pictures.length)];

          return (
            <div className='pictures-list' >
            <p className='text-center'> Picture returned from Unsplash API on keyword {this.props.selectTown}</p>
                {randomPicture}
                
            </div>
            )
          } else {
              return (
              <div className='pictures-list'>
              <p className='text-center'>
              Click to marker or location to see some nice pictures from Unsplash.
                  
              </p>
              </div>
              )
            }
      }
}

export default SplashPicture