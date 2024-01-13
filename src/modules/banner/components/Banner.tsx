import { BoidCanvas } from 'modules/boids'

import profile from 'data/profile'

import '../styles/banner.css'

function Banner() {
  return (
    <div className="banner" id="banner">
      <BoidCanvas />
      <div className="banner-container">
        <div className="banner-pfp">
          <img src="pfp.png" alt="Profile Picture" />
          <div />
        </div>

        <article className="banner-card">
          <h2>{profile.name}</h2>
          <div className="banner-card-details">
            <address>
              <a href={`mailto: ${profile.email}`}>{profile.email}</a>
              <br />
              <a href={`tel: ${profile.phone}`}>{profile.phone}</a>
            </address>
            <p>{profile.description}</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Banner
