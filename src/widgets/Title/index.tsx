import React, { ReactNode } from 'react'
import * as styles from './style.module.scss'
type Props = {}

const Title = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}></div>
            <div className={styles.title}>{children}</div>
        </div>
    )
}

export default Title
