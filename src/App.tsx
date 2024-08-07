import { Banner } from 'modules/banner'
import { ProjectCarousel } from 'modules/project_carousel'
import { Footer } from 'modules/footer'
import { TechList } from 'modules/tech_list'

import { blubify, portfolio, imgscal } from './data/projects'
import { tech } from './data/techlist'

function App() {
    return (
        <div>
            <Banner />
            <ProjectCarousel projects={[imgscal, blubify, portfolio]} />
            <TechList techs={tech} />
            <Footer />
        </div>
    )
}

export default App
