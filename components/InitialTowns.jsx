import Link from 'next/link'
import React from 'react'
import styles from '../styles/InitialTowns.module.css'
const InitialTowns = ({data}) => {
  return (
    <div className={styles.container}>
        
        {data.map(town => {
            return (
                <div className={styles.cell} key={town.location.name + Math.random()}>
                    <Link href={"/forecast/" + town.location.name}>
                        <a><p className={styles.locationText}>{town.location.name + ' ' + town.location.region} </p></a>
                    </Link>
                    <p className={styles.tempText}>{town.current.temp_c + 'C'} </p>
                    <p >{town.current.wind_kph + ' km/h'} </p>
                    <img className={styles.condiditonImg} src={town.current.condition.icon} alt={town.current.condition.text}/>
                    <p>{town.current.last_updated} </p>
                </div>
            )
        })}
        
    </div>
  )
}

export default InitialTowns

