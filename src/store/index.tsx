import { SLIDES_COUNT } from '@/shared/settings'
import React, { ReactNode } from 'react'
import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'

const Context = createContext({
    value: 0,
    setValue: (value: number) => {},
    increment: () => {},
    decrement: () => {},
})

const SlideProvider = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState(0)

    const increment = useCallback(
        () => setValue(Math.min(value + 1, SLIDES_COUNT - 1)),
        [value, setValue]
    )
    const decrement = useCallback(
        () => setValue(Math.max(value - 1, 0)),
        [value, setValue]
    )

    const context = useMemo(
        () => ({
            value,
            increment,
            decrement,
            setValue,
        }),
        [value, increment, decrement, setValue]
    )

    return <Context value={context}>{children}</Context>
}

const useSlideContext = () => {
    const context = useContext(Context)

    if (!context)
        throw new Error('useSlideContext must used with SlideProvider')

    return context
}

export { SlideProvider, useSlideContext }
