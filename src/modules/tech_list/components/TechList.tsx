import type { Tech } from '../types/tech'

import '../styles/tech_list.css'

type TechListProps = {
  techs: Tech[]
}

function TechList(props: TechListProps) {
  return (
    <div className="tech-list-panel">
      <h3 className="tech-list-header">Technologies I Use</h3>
      <ul className="tech-list">
        {props.techs.map((tech) => (
          <li className="tech-list-item" key={tech.title}>
            <p className="tech-list-title">
              <img src={tech.icon} alt={`Logo for ${tech}.`} className="tech-list-icon" title={tech.title} />
              {tech.title}
            </p>
            <div className="tech-list-bar" style={{ width: 75 * (tech.percentage / 100) + '%' }} />
            <div className="tech-list-divider" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TechList
