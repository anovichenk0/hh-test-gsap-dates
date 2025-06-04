import Button from '@/shared/Button'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SLIDES_COUNT } from '@/shared/settings'
import * as styles from './style.module.scss'
import cn from 'classnames'
import { useSlideContext } from '@/store'
import { data } from '@/data'

gsap.registerPlugin(useGSAP)

type Props = {}
const MagicCircles = () => {
    const { value } = useSlideContext()
    const [savedValue, setSavedValue] = useState(value)
    const circle = useRef(null)
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
        const fromIndex = savedValue
        const toIndex = value

        let delta = (toIndex - fromIndex + SLIDES_COUNT) % SLIDES_COUNT
        const directDistance = delta
        const reverseDistance = SLIDES_COUNT - delta

        let angleDelta = 0

        if (directDistance <= reverseDistance) {
            angleDelta = -directDistance * 60
        } else {
            angleDelta = reverseDistance * 60
        }

        setRotation((prev) => prev + angleDelta)
        setSavedValue(value)
    }, [value])

    useGSAP(() => {
        gsap.to(circle.current, {
            rotation,
        })
    }, [rotation])

    return (
        <div ref={circle} className={styles.container}>
            {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
                <MagicCircle
                    parentRotation={rotation}
                    key={index}
                    index={index}
                />
            ))}
        </div>
    )
}

const disableCircles = (el: HTMLElement) => {
    gsap.to(el, {
        scaleX: '10%',
        scaleY: '10%',
        background: '#42567a',
    })
}

const MagicCircle = ({
    parentRotation,
    index,
}: {
    index: number
    parentRotation: number
}) => {
    const { setValue, value } = useSlideContext()
    const container = useRef(null)
    const buttonRef = useRef(null)
    const antiRotation = useRef(null)
    const labelRef = useRef(null)
    const timelineRef = useRef<gsap.core.Timeline>(null)
    const label = data.at(index)?.label
    const circleDuration = 0.4

    useEffect(() => {
        gsap.to(antiRotation.current, {
            rotation: -parentRotation,
        })
    }, [parentRotation])

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true })
        timelineRef.current = tl

        const el = buttonRef.current!
        disableCircles(el)

        tl.to(el, {
            scaleX: '100%',
            scaleY: '100%',
            border: '1px solid #42567a',
            background: '#fff',
            duration: circleDuration,
            delay: 0,
            ease: 'sine.in',
        })

        tl.add(() => {
            el!.style.fontSize = '2rem'
        }, 0.2)
    }, [])
    const handleEnter = () => {
        timelineRef.current?.restart()
    }

    const handleLeave = () => {
        disableCircles(buttonRef.current!)
    }

    const active = value === index

    if (!active) {
        gsap.to(labelRef.current, {
            opacity: 0,
        })
    }
    useGSAP(() => {
        gsap.killTweensOf(labelRef.current)
        if (active) {
            console.log('active', value)
            gsap.fromTo(
                labelRef.current,
                {
                    opacity: 0,
                },
                {
                    delay: circleDuration,
                    duration: 1.5,
                    opacity: 1,
                }
            )
        } else {
            console.log('disable', value)
            gsap.to(labelRef.current, {
                opacity: 0,
            })
        }
    }, [active])

    return (
        <div
            onClick={() => setValue(index)}
            ref={container}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={styles.magicDot__container}
        >
            <div ref={antiRotation}>
                <button
                    ref={buttonRef}
                    className={cn('button', styles.magicDot)}
                >
                    {index + 1}
                </button>
                <div ref={labelRef} className={styles.magicDot__label}>
                    {label}
                </div>
            </div>
        </div>
    )
}

export default MagicCircles
