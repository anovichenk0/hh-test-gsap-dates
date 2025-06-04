import Button from '@/shared/Button'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SLIDES_COUNT } from '@/shared/settings'
import * as styles from './style.module.scss'
import cn from 'classnames'
import { useSlideContext } from '@/store'

gsap.registerPlugin(useGSAP)

type Props = {}
const MagicCircles = (props: Props) => {
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
                    order={index + 1}
                />
            ))}
        </div>
    )
}

const disableCircles = (el: HTMLElement) => {
    gsap.to(el, {
        scaleX: '20%',
        scaleY: '20%',
        background: '#42567a',
    })
}

const MagicCircle = ({
    parentRotation,
    order,
}: {
    order: number
    parentRotation: number
}) => {
    const { setValue, value } = useSlideContext()
    const container = useRef(null)
    const buttonRef = useRef(null)
    const antiRotation = useRef(null)
    const timelineRef = useRef<gsap.core.Timeline>(null)

    useEffect(() => {
        gsap.to(antiRotation.current, {
            rotation: -parentRotation,
        })
    }, [parentRotation])

    useGSAP(() => {
        const tl = gsap.timeline({ paused: true })
        timelineRef.current = tl

        const el = buttonRef.current!
        if (!el) {
            return
        }

        disableCircles(el)

        tl.to(el, {
            scaleX: '100%',
            scaleY: '100%',
            border: '1px solid #42567a',
            background: '#fff',
            duration: 0.4,
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

    return (
        <div
            onClick={() => setValue(order - 1)}
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
                    {order}
                </button>
            </div>
        </div>
    )
}

export default MagicCircles
