import React from 'react'
import * as styles from './style.module.scss'

const firstDate = 2018
const secondDate = 2022
const Time = () => {
    console.log(styles)
    return (
        <div className={styles.position}>
            <span className={styles.titleAccent}>{firstDate}</span>
            <span className={styles.titleSecondary}>{secondDate}</span>
        </div>
    )
}

export default Time
