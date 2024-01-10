import { Banner } from 'modules/banner'
import { ProjectCarousel } from 'modules/project_carousel'
import { Footer } from 'modules/footer'

import { blubify, upscaleCli, portfolio } from './data/projects'

function App() {
  return (
    <div>
      <Banner />
      <ProjectCarousel projects={[blubify, upscaleCli, portfolio]} />
      <Footer />
    </div>
  )
}

export default App
