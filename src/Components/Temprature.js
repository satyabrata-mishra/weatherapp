import React, { useState, useEffect } from 'react'
import Loader from './Loader';
import './Temprature.css'

export default function Temprature() {
    const [city, setCity] = useState("Bangalore");
    const [weather, setWeather] = useState("fas fa-sun");
    const [details, setDetails] = useState({});
    const [loader, setLoader] = useState(false);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=286c8bfc649981f6d4054271445699d3&units=metric`;
    function getLocation() {
        setLoader(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=286c8bfc649981f6d4054271445699d3&units=metric`;
                fetchurl();
            });
        } else {
            alert("Error while fetching location!!!");
        }
    }
    function citycall() {
        setLoader(true);
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=286c8bfc649981f6d4054271445699d3&units=metric`;
        fetchurl();
    }
    async function fetchurl() {
        try {
            let data = await (await fetch(url)).json();
            let date = new Date(data.sys.sunset * 1000)
            const sunset = `${date.getHours()}:${date.getMinutes()}`;
            date = new Date(data.sys.sunrise * 1000);
            const sunrise = `${date.getHours()}:${date.getMinutes()}`;
            setDetails({
                "temp": data.main.temp,
                "weather": data.weather[0].main,
                "place": data.name + "," + data.sys.country,
                "sunset": sunset,
                "humidity": data.main.humidity,
                "pressure": data.main.pressure,
                "wind": data.wind.speed,
                "sunrise": sunrise,
                "visibility": data.visibility,
                "mintemp": data.main.temp_min,
                "maxtemp": data.main.temp_max,
            });
            if (details.weather === "Smoke" || details.weather === "Haze" || details.weather === "Mist") {
                setWeather("fas fa-smog");
            }
             if (details.weather === "Clouds") {
                setWeather("fas fa-cloud-sun");
            }
             if (details.weather === "Clear") {
                setWeather("fas fa-sun");
            }
            else if (details.weather === "Thunderstrom") {
                setWeather("fas fa-poo-storm");
            }
            else if (details.weather === "Rain") {
                setWeather("fas fa-cloud-showers-heavy");
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            alert("City Not Found!!!");
        }
    }
    useEffect(() => {
        citycall();
    }, [])

    return (
        <div className="body">
            <div className="search">
                <input type="search" value={city} onChange={(e) => setCity(e.target.value)} />
                <button className='searchbutton' type='button' onClick={citycall}>SEARCH</button>
                <div className='currentlocation' onClick={getLocation}><i className='fas fa-map-marker-alt'></i></div>
            </div>
            {loader && <Loader />}
            <div className="card">
                <div className="weathercondition">
                    <i className={weather}></i>
                </div>
                <div className="weatherdetails">
                    <div className='first'>
                        <p>{details.temp} &deg;</p>
                    </div>
                    <div className='second'>
                        <p>{details.weather} <br /> {details.place}</p>
                    </div>
                    <div className='third'>
                        {new Date().toLocaleString()}
                    </div>
                </div>
                <div className="moredeatils">
                    <div className='firstmore'>
                        <i className='fas fa-cloud-meatball'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.sunset}<br /> Sunset</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fas fa-water'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.humidity}%<br /> Humidity</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fas fa-cloud-showers-heavy'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.pressure} hPa<br /> Pressure</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fas fa-wind'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{parseInt(details.wind * 3.6)} km/h <br /> Speed</p>
                    </div>
                </div>
                <div className="moredeatils">
                    <div className='firstmore'>
                        <i className='fas fa-cloud-sun'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.sunrise}<br /> Sunrise</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fa fa-chevron-down'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.visibility / 1000} km<br /> Visibility</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fas fa-temperature-low'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.mintemp} <br />Min Temp</p>
                    </div>
                    <div className='firstmore'>
                        <i className='fas fa-temperature-high'></i>
                    </div>
                    <div className='firstmore'>
                        <p>{details.maxtemp} <br />Max Temp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}