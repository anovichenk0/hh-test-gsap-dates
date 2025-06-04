import React, { ComponentProps } from 'react'
import * as styles from './style.module.scss'
import cn from 'classnames'

const variants = {
    outlined: styles.outlined,
    filled: styles.filled,
} as const

type Variants = keyof typeof variants

const Button = ({
    className,
    children,
    variant = 'outlined',
    ...props
}: ComponentProps<'button'> & { variant?: Variants }) => {
    return (
        <button
            className={cn(
                `${styles.button} ${variants[variant]} ${className} `
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
