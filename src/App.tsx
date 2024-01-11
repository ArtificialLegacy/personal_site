import { Banner } from 'modules/banner'
import { ProjectCarousel } from 'modules/project_carousel'
import { Footer } from 'modules/footer'
import { TechList } from 'modules/tech_list'

import { blubify, upscaleCli, portfolio } from './data/projects'
import { tech } from './data/techlist'

function App() {
  return (
    <div>
      <Banner />
      <TechList techs={tech} />
      <ProjectCarousel projects={[blubify, upscaleCli, portfolio]} />
      <Footer />
    </div>
  )
}

export default App
