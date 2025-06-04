import React, { useEffect, useRef, useState } from 'react'
import * as styles from './style.module.scss'
import { useSlideContext } from '@/store'
import { data } from '@/data'
import { gsap } from 'gsap/gsap-core'
const Time = () => {
    const { value } = useSlideContext()
    const currentData = data.at(value)
    const startRef = useRef({ val: currentData!.start })
    const endRef = useRef({ val: currentData!.end })
    const [startYear, setStartYear] = useState(currentData!.start)
    const [endYear, setEndYear] = useState(currentData!.end)

    useEffect(() => {
        gsap.to(startRef.current, {
            val: currentData!.start,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
                setStartYear(Math.floor(startRef.current.val))
            },
        })

        gsap.to(endRef.current, {
            val: currentData!.end,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
                setEndYear(Math.floor(endRef.current.val))
            },
        })
    }, [currentData])

    return (
        <div className={styles.position}>
            <span className={styles.titleAccent}>{startYear}</span>
            <span className={styles.titleSecondary}>{endYear}</span>
        </div>
    )
}

export default Time
