import type { Tech } from '../types/tech'

import '../styles/tech_list.css'

type TechListProps = {
    techs: Tech[]
}

function TechList(props: TechListProps) {
    return (
        <div className="tech-list-panel">
            <header>
                <div>
                    <h3>Technologies I Use</h3>
                </div>
            </header>
            <ol className="tech-list">
                {props.techs.map((tech) => (
                    <li className="tech-list-item" key={tech.title}>
                        <img src={tech.icon} alt={`Logo for ${tech}.`} title={tech.title} />
                        <h6>{tech.title}</h6>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default TechList
