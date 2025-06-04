import React, { useEffect, useRef } from 'react'
import * as styles from './style.module.scss'
import { data } from '@/data'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Button from '@/shared/Button'
import { ArrowLeft, ArrowRight } from '@/shared/Icons'
import { useSlideContext } from '@/store'
import { SLIDES_COUNT } from '@/shared/settings'
import { gsap } from 'gsap/gsap-core'
import { useGSAP } from '@gsap/react'
const Carousel = () => {
    const { value } = useSlideContext()
    const currentData = data.at(value)
    return (
        <div className={styles.container}>
            <Total></Total>
            <Controls></Controls>
            <Swiper slidesPerView={3} spaceBetween={50}>
                {currentData?.news.map((item) => (
                    <SwiperSlide>
                        <Item
                            key={item.description}
                            date={item.year}
                            description={item.description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

const Total = () => {
    const { value } = useSlideContext()

    return (
        <div className={styles.total__container}>
            <span className={styles.total}>
                {(value + 1).toString().padStart(2, '0')}/
                {SLIDES_COUNT.toString().padStart(2, '0')}
            </span>
        </div>
    )
}

const Controls = () => {
    const { increment, decrement, value } = useSlideContext()

    return (
        <div className={styles.controls}>
            <Button disabled={value === 0} onClick={decrement}>
                <ArrowLeft />
            </Button>
            <Button disabled={value === SLIDES_COUNT - 1} onClick={increment}>
                <ArrowRight />
            </Button>
        </div>
    )
}

const Item = (props: { date: string; description: string }) => {
    const ref = useRef(null)

    useGSAP(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
        )
    }, [])

    useGSAP(() => {
        return gsap.fromTo(
            ref.current,
            { opacity: 1, y: 0 },
            {
                opacity: 0,
                y: 10,
                duration: 0.1,
                ease: 'power2.in',
            }
        )
    }, [])

    return (
        <div ref={ref} className={styles.item}>
            <h3 className={styles.item__year}>{props.date}</h3>
            <p className={styles.item__description}>{props.description}</p>
        </div>
    )
}

export default Carousel
