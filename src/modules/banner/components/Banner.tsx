import { useState, useCallback } from 'react'

import profile from 'data/profile'

import '../styles/banner.css'

import { Canvas } from 'modules/canvas'
import { BoidCanvas } from 'modules/boids'
import { IKCanvas } from 'modules/inverse_kinematics'

const CanvasList = [
    {
        text: 'Inverse Kinematics',
        canvas: IKCanvas,
    },
    {
        text: 'Boids',
        canvas: BoidCanvas,
    },
]

function Banner() {
    const [activeCanvas, setCanvas] = useState(0)

    const up = useCallback(() => {
        setCanvas(activeCanvas - 1)
    }, [activeCanvas])

    const down = useCallback(() => {
        setCanvas(activeCanvas + 1)
    }, [activeCanvas])

    return (
        <div className="banner" id="banner">
            <Canvas {...CanvasList[activeCanvas].canvas} />
            <div className="banner-container">
                <article className="banner-card">
                    <h2>{profile.name}</h2>
                    <div className="banner-card-details">
                        <address>
                            <a href={`mailto: ${profile.email}`}>{profile.email}</a>
                            <br />
                            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                                LinkedIn
                            </a>
                            <br />
                            <a href={profile.github} target="_blank" rel="noreferrer noopener">
                                GitHub
                            </a>
                        </address>
                    </div>
                </article>
            </div>
            <div className="banner-selector">
                {activeCanvas > 0 && <button onClick={up}>⇑</button>}
                <p>{CanvasList[activeCanvas].text}</p>
                {activeCanvas < CanvasList.length - 1 && <button onClick={down}>⇓</button>}
            </div>
        </div>
    )
}

export default Banner
