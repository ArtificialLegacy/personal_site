import { Canvas } from 'modules/canvas'

import profile from 'data/profile'

import '../styles/banner.css'

import { BoidCanvas } from 'modules/boids'

function Banner() {
    return (
        <div className="banner" id="banner">
            <Canvas {...BoidCanvas} />
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
        </div>
    )
}

export default Banner
