import { Banner } from 'modules/banner'
import { ProjectCarousel } from 'modules/project_carousel'
import { Footer } from 'modules/footer'
import { TechList } from 'modules/tech_list'

import { blubify, upscaleCli, portfolio } from './data/projects'
import { typescript, react, nodejs, mariadb, express } from './data/techlist'

function App() {
  return (
    <div>
      <Banner />
      <TechList techs={[typescript, react, nodejs, mariadb, express]} />
      <ProjectCarousel projects={[blubify, upscaleCli, portfolio]} />
      <Footer />
    </div>
  )
}

export default App
