import React from 'react'
import styles from '../styles/Search.module.css'
import {useState} from 'react';
import {useRouter} from 'next/router';
const Search = () => {
  const [value, setValue] = useState('');
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push('/search/' + value)
  }
  return (
    <div className={styles.searchContainer}>
        <form onSubmit={onSubmit}>
          <input value={value} onChange={(e) => setValue(e.target.value)} className={styles.searchInput} type="text" placeholder="Search any city" />
        </form>
    </div>
  )
}

export default Search