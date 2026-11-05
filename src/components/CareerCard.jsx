import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Icon from './Icon'

export default function CareerCard({ career }) {
  return (
    <Link to={`/careers/${career.id}`} className="career-card">
      <div className="career-icon">
        <Icon name={career.icon} size={22} />
      </div>
      <h3>{career.title}</h3>
      <p className="desc">{career.tagline}.</p>

      <div className="career-tags">
        {career.skills.slice(0, 3).map((s) => (
          <span className="career-tag" key={s.name}>
            {s.name}
          </span>
        ))}
      </div>

      <div className="career-foot">
        <div className="salary-mini">
          Entry level
          <strong>{career.salary.entry}</strong>
        </div>
        <span className="link-arrow">
          Explore <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  )
}
