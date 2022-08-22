import React from 'react'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'
const Nav = () => {
  return (
    <nav className={styles.nav}>
        <Link href="/">
          <a>
            <h1>Weather API</h1>
          </a>
        </Link>
    </nav>
  )
}

export default Nav