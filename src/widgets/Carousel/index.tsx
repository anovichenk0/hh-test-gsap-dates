import React, { useEffect, useRef, useState } from 'react'
import * as styles from './style.module.scss'
import { data } from '@/data'
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Button from '@/shared/Button'
import { ArrowLeft, ArrowRight } from '@/shared/Icons'
import { useSlideContext } from '@/store'
import { SLIDES_COUNT } from '@/shared/settings'
import { gsap } from 'gsap/gsap-core'
import { useGSAP } from '@gsap/react'
import SwiperCore from 'swiper'
const Carousel = () => {
    const { value } = useSlideContext()
    const currentData = data.at(value)
    const swiperRef = useRef<SwiperCore>(null)
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        if (swiperRef.current) {
            console.log(swiperRef.current)
            swiperRef.current.slideTo(0)
        }
    }, [value])

    return (
        <div className={styles.container}>
            <div className={styles.controls__container}>
                <Total></Total>
                <Controls></Controls>
            </div>
            <div>
                <Description></Description>
                <div className={styles.swiper__container}>
                    <Swiper
                        onSlideChange={(swiper) => {
                            setIsEnd(swiper.isEnd)
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        onReachEnd={() => {
                            setIsEnd(true)
                        }}
                        onReachBeginning={() => {
                            setIsEnd(false)
                        }}
                        breakpoints={{
                            991.98: {
                                slidesPerView: 3,
                            },
                        }}
                        // slideClass={styles.swiper__slide}
                        slidesOffsetBefore={16}
                        // className={styles.swiper}
                        slidesPerView={1.5}
                        spaceBetween={50}
                        slidesOffsetAfter={16}
                    >
                        {currentData?.news.map((item) => (
                            <SwiperSlide>
                                <Item
                                    key={item.description}
                                    date={item.year.toString()}
                                    description={item.description}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div>
                        <SwipeButton isEnd={isEnd} swiper={swiperRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Description = () => {
    const { value } = useSlideContext()
    const label = data.at(value)?.label

    return (
        <div className={styles.description}>
            <h3>{label}</h3>
            <hr />
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

const SwipeButton = ({
    swiper,
    isEnd,
}: {
    swiper: React.RefObject<SwiperCore | null>
    isEnd: boolean
}) => {
    return (
        <Button
            className={styles.swipebutton}
            disabled={isEnd}
            variant="filled"
            onClick={() => {
                swiper?.current?.slideNext()
            }}
        >
            <ArrowRight />
        </Button>
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
