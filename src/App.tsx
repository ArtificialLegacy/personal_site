import { Banner } from 'modules/banner'
import { ProjectListCarousel } from 'modules/project_carousel'
import { Footer } from 'modules/footer'

import { blubify, upscaleCli, portfolio } from './projects'

function App() {
  return (
    <div>
      <Banner />
      <ProjectListCarousel projects={[blubify, upscaleCli, portfolio]} />
      <Footer />
    </div>
  )
}

export default App
