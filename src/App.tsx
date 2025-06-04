import React from 'react'
import Button from './shared/Button'
import Title from './widgets/Title'
import Time from './widgets/Time'
import Carousel from './widgets/Carousel'
import { SlideProvider } from './store'
import MagicCircles from './widgets/MagicCircles'
const App = () => {
    return (
        <SlideProvider>
            <div className="wrapper">
                <div className="container">
                    <div className="circle"></div>
                    <Title>
                        <span>
                            Исторические
                            <br />
                            даты
                        </span>
                    </Title>
                </div>
                <Time />

                <MagicCircles></MagicCircles>

                <div className="container space">
                    <Carousel></Carousel>
                </div>
            </div>
        </SlideProvider>
    )
}

export default App
