import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InitialTowns from '../components/InitialTowns'

import Search from '../components/Search'

export default function Home({data}) {

  return (
    <>
      <Search />
      <InitialTowns data={data} />
          {/* //search
          //5 towns */}
    </>
  )
}

export const getServerSideProps = async () => {
  const urls = [
    'http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Tallinn&days=2',
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Haapsalu&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Pärnu&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Narva&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Kärdla&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Haapsalu&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Rakvere&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Viljandi&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Kuressaare&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Keila&days=2`,
    `http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Otepää&days=2`,
  ]
  const getData = async (url) => {
    return new Promise(async (resolve,reject) => {
      try {
        await fetch(url).then(res => res.json()).then( (res) => resolve(res))

      } catch (error) {
        reject(error)
      }
    })
  }
  
  const data = await Promise.all(
    urls.map(url => {
      return getData(url)
    })
  ).catch(err => console.log(err))
  // const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a289c9405eee4329b2690540222607&q=Tallinn&days=2`);
  // const res = await response.json()
  return {
    props: {
      data: data
    }
  }
}