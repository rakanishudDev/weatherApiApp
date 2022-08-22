import React from 'react'
import {useRouter} from 'next/router'
import styles from '../../styles/CityForecast.module.css'
const CityForecast = ({data}) => {
    const router = useRouter();
    const city = router.query.city;
    console.log(data)
    const correctTime = (time12h) => {
        let [time, modifier] = time12h.split(' ')
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00'
        }
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12
        }
        return `${hours}:${minutes}`
    }
    const sunrise = correctTime(data.forecast.forecastday[0].astro.sunrise)
    const sunset = correctTime(data.forecast.forecastday[0].astro.sunset)
    const moonrise = correctTime(data.forecast.forecastday[0].astro.moonrise)
    const moonset = correctTime(data.forecast.forecastday[0].astro.moonset)

  return (
    <div className={styles.container}>
        <div >
            <div className={styles.heading}>
                <div className={styles.location}>
                    <img width="20px" height="20px" src="/locationImg.svg" alt="location icon" />
                    <h3 className={styles.locationRegion}>{data.location.name + ' ' + data.location.region}</h3>
                </div>
                <p className={styles.locationCountry}>{data.location.country}</p>
            </div>
            <p className={styles.currentWeatherText}></p>
            <fieldset className={styles.currentWeather}>
                <legend className={styles.currentWeatherText}><i>Current Weather</i></legend>
                <p>{data.current.last_updated}</p>
                <p>{data.current.temp_c + 'C'}</p>
                <p>{data.current.wind_kph + ' km/h'}</p>
                <img src={data.current.condition.icon} alt={data.current.condition.text} />
                <p>{data.current.precip_mm + ' mm'}</p>
                
            </fieldset>
            <div className={styles.sunriseAndSunset}>
                <div>
                    <p>Sunrise: {sunrise}</p>
                    <p>Sunset: {sunset}</p>
                </div>
                <div>
                    <p>Moonrise: {moonrise}</p>
                    <p>Moonset: {moonset}</p>
                </div>
            </div>
            <div className={styles.forecastTable}>
                <div>
                    <h4>Today | <i>{data.forecast.forecastday[0].date}</i></h4>
                    {data.forecast.forecastday[0].hour.map(hour => {
                        return (
                            <div key={hour.time} className={styles.hourCell}>
                                <p className={styles.hourTime} >{hour.time.slice(11)}</p>
                                <p>{hour.temp_c + 'C'}</p>
                                <p>{hour.wind_kph + ' km/h ' + hour.wind_dir }</p>
                                <img src={hour.condition.icon} alt={hour.condition.text} />
                                <p>{hour.precip_mm + ' mm'}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                <h4>Tomorrow | <i>{data.forecast.forecastday[1].date}</i></h4>
                    {data.forecast.forecastday[1].hour.map(hour => {
                        return (
                            <div key={hour.time} className={styles.hourCell}>
                                <p className={styles.hourTime} >{hour.time.slice(11)}</p>
                                <p>{hour.temp_c + 'C'}</p>
                                <p>{hour.wind_kph + ' km/h ' + hour.wind_dir }</p>
                                <img src={hour.condition.icon} alt={hour.condition.text} />
                                <p>{hour.precip_mm + ' mm'}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CityForecast

export const getServerSideProps = async (ctx) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=${ctx.query.city}&days=2`)
    const res = await response.json();
    return {
        props: {
            data: res
        }
    }

}