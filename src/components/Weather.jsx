import React, { Component, useDebugValue } from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: [],
      weatherData: {},
      location: '',
    };
  }

  componentDidMount() {
    console.log('Called when component is mounted');
  }

  componentDidUpdate() {
    console.log(
      'Called when component is update setState, change of props, forceUpdate'
    );
  }

  componentWillUnmount() {
    console.log('When component is killed');
  }

  geoKey =
    'pk.eyJ1IjoiZ2lyaXNoa2FtYXQyMyIsImEiOiJja3dmNWcybmswYmRkMnlwMmlpN3FsM3FlIn0.hvdCngAMgqPxWb7Jqkoc7w';

  getCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.location}.json?access_token=${this.geoKey}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({ locationData: data.features[0].center }, () => {
          this.getWeather();
        })
      );
  };

  weatherKey = 'f12c866884b764f78069ad9aa1986f27';

  getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.locationData[0]}&lon=${this.state.locationData[1]}&appid=${this.weatherKey}`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ weatherData: data }));
  };

  render() {
    console.log(this.state.locationData);
    console.log(this.state.weatherData);
    return (
      <div>
        <input
          type="text"
          placeholder="Input Place"
          value={this.state.location}></input>
        <button onClick={this.getCoordinates}>Get Weather</button>
      </div>
    );
  }
}

export default Weather;
