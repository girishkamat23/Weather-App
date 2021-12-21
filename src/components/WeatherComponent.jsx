import React, { useEffect, useState } from 'react';

const WeatherComponent = () => {
  const geoKey =
    'pk.eyJ1IjoiZ2lyaXNoa2FtYXQyMyIsImEiOiJja3dmNWcybmswYmRkMnlwMmlpN3FsM3FlIn0.hvdCngAMgqPxWb7Jqkoc7w';

  const weatherKey = 'f12c866884b764f78069ad9aa1986f27';

  const [location, setLocation] = useState('');
  // const [location2, setLocation2] = useState('');
  const [locationData, setLocationData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  // const [countries, setCountries] = useState([]);

  const handleOnChange = (e) => {
    // switch (e.target.id) {
    //   case 'location':
    console.log('Hello', e);
    setLocation(e.target.value);
    //     break;
    //   case 'location2':
    //     setLocation2(e.target.value);
    //     break;
    //   default:
    //     console.log('Hello');
    // }
  };
  const getCoordinates = () => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${geoKey}`
    )
      .then((response) => response.json())
      .then((data) => setLocationData(data.features));
  };

  console.log('Location Data', locationData);

  const getWeather = ([lon, lat]) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherKey}`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data));
  };

  useEffect(() => {
    setLocationData([]);
  }, [weatherData]);

  // useEffect(() => {
  //   // console.log('Component is mounted');
  // });

  /*   //component did mount
  useEffect(() => {
    // console.log('Component is mounted');
    //fetch list of countries
    fetch('/countryList.json')
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log('Countries', res);
        setCountries(res?.results?.countries);
      });
  }, []); */

  /* useEffect(() => {
    if (locationData && locationData.length) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationData[1]}&lon=${locationData[0]}&units=metric&appid=${weatherKey}`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data));
    }
  }, [locationData]);
 */
  return (
    <div>
      {/* <select>
        {countries.map((country, index) => {
          return <option key={index}>{country}</option>;
        })}
      </select> */}
      <input
        type="text"
        placeholder="Input Place"
        value={location}
        id="location"
        onChange={handleOnChange}></input>
      {/* <input
        type="text"
        placeholder="New"
        value={location2}
        id="location2"
        onChange={handleOnChange}></input> */}
      <button onClick={getCoordinates}>Get Weather</button>
      <div>
        {locationData
          ? locationData.map((location, index) => {
              console.log('Location' + index, location);
              return (
                <div
                  className="location-item"
                  onClick={() => getWeather(location.center)}
                  key={location.id}>
                  <p>{location.place_name}</p>
                </div>
              );
            })
          : 'No results found'}
      </div>
      {weatherData && weatherData.main ? (
        <h3>
          Current Temperature at{' '}
          <span style={{ fontSize: '25px' }}>{weatherData?.name}</span> is{' '}
          {weatherData?.main?.temp} &deg;C
        </h3>
      ) : (
        ''
      )}
    </div>
  );
};

export default WeatherComponent;
