import React from 'react'
import styles from '../../styles/SearchPage.module.css'
import Link from 'next/link'
import Search from '../../components/Search'

const SearchPage = ({data, search}) => {
    console.log(data)
  return (<>
    <Search />
    <br />
    <div className={styles.container}>
        {data.length === 0 ? <p>No search results for &quot;{search}&quot;</p> : data.map(city => {
            return (
                <Link href={"/forecast/" + city.name} key={city.id}>
                 <a>
                    <div className={styles.searchResult}>
                        <img width="20px" height="20px" alt="location icon" src="/locationImg.svg" />
                        <div>
                            <h3 className={styles.searchResultLocation}>{city.name}</h3>
                            <p className={styles.searchResultLocation}>{city.region + ' ' + city.country + ' (' + city.lat + ', ' + city.lon + ')'}</p>
                        </div>
                        
                    </div>
                 </a>
                </Link>
            )
        })}
    </div>
    </>)
}

export default SearchPage

export const getServerSideProps = async (ctx) => {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=a289c9405eee4329b2690540222607&q=${ctx.query.search}`)
    .catch(err => console.log(err))
    const res = await response.json()
    return {
        props: {
            data: res,
            search: ctx.query.search
        }
    }
}