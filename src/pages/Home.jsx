import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Play,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import { careers } from '../data/careers'
import { popularSkills } from '../data/skills'
import { howItWorks, stats, testimonials } from '../data/site'
import CareerCard from '../components/CareerCard'
import Icon from '../components/Icon'
import { SectionHead } from '../components/ui'

const colleges = [
  'Sardar Patel Institute of Technology',
  'VIT Vellore',
  'NIT Trichy',
  'COEP Pune',
  'IIIT Hyderabad',
  'BITS Pilani',
]

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero">
        <span className="hero-glow one" />
        <span className="hero-glow two" />
        <span className="hero-glow three" />

        <div className="container hero-inner">
          <div>
            <span className="hero-badge">
              <span className="pill">New</span>
              AI skill-gap analysis is live
            </span>

            <h1>
              Build Skills.
              <br />
              Discover Opportunities.
              <br />
              <span className="grad">Shape Your Future.</span>
            </h1>

            <p className="hero-sub">
              Your AI-powered companion for career growth, skill development and placement preparation.
            </p>

            <div className="hero-ctas">
              <Link to="/careers" className="btn btn-primary btn-lg">
                Explore Careers <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-outline-white btn-lg">
                Get Started
              </Link>
            </div>

            <div className="hero-meta">
              <div className="hero-meta-item">
                <strong>48,000+</strong>
                <span>students learning</span>
              </div>
              <span className="hero-meta-divider" />
              <div className="hero-meta-item">
                <strong>7</strong>
                <span>career tracks</span>
              </div>
              <span className="hero-meta-divider" />
              <div className="hero-meta-item">
                <strong>320+</strong>
                <span>partner colleges</span>
              </div>
              <span className="hero-meta-divider" />
              <div className="hero-meta-item">
                <strong>4.8/5</strong>
                <span>student rating</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="mock-window">
              <div className="mock-bar">
                <span className="mock-dot red" />
                <span className="mock-dot amber" />
                <span className="mock-dot green" />
                <span className="mock-title">skillbridge.in/dashboard</span>
              </div>
              <div className="mock-body">
                <div className="mock-row">
                  <div>
                    <div className="mock-label">Your target role</div>
                    <div className="mock-value">Frontend Engineer</div>
                  </div>
                  <span className="badge badge-purple">On track</span>
                </div>

                <div className="mock-card">
                  <div className="mock-row">
                    <span className="mock-label">Skill readiness</span>
                    <span className="mock-value">68%</span>
                  </div>
                  <div className="mock-progress">
                    <i style={{ width: '68%' }} />
                  </div>
                  <div className="mock-tags">
                    <span className="mock-tag">React ✓</span>
                    <span className="mock-tag">JavaScript ✓</span>
                    <span className="mock-tag dim">TypeScript</span>
                    <span className="mock-tag dim">Testing</span>
                  </div>
                </div>

                <div className="mock-card">
                  <div className="mock-row">
                    <span className="mock-label">This week</span>
                    <span className="mock-value">3 of 4 topics</span>
                  </div>
                  <div className="mock-progress">
                    <i style={{ width: '75%', background: 'linear-gradient(90deg,#10B981,#34D399)' }} />
                  </div>
                </div>

                <div className="mock-row">
                  <span className="mock-label">Next best action</span>
                  <span className="mock-value" style={{ fontSize: '0.75rem' }}>Build a REST API →</span>
                </div>
              </div>
            </div>

            <div className="float-card one">
              <span className="fc-icon green">
                <BadgeCheck size={16} />
              </span>
              <div>
                <strong>Skill gap closed</strong>
                <span>SQL · 3 weeks</span>
              </div>
            </div>

            <div className="float-card two">
              <span className="fc-icon">
                <Sparkles size={16} />
              </span>
              <div>
                <strong>AI roadmap ready</strong>
                <span>18 topics · 96 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ logo strip */}
      <div className="logo-strip">
        <div className="container logo-strip-inner">
          <p>Students from</p>
          {colleges.map((c) => (
            <span className="logo-item" key={c}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------- career paths */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Career paths"
            title="Pick a direction with real hiring behind it"
            sub="Every track lists the skills employers actually screen for, an indicative salary band and how hard it is to break into."
          />

          <div className="career-grid">
            {careers.slice(0, 6).map((c) => (
              <CareerCard career={c} key={c.id} />
            ))}
          </div>

          <div className="center mt-48">
            <Link to="/careers" className="btn btn-dark">
              View all 7 career tracks <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- skills */}
      <section className="section section-grey">
        <div className="container">
          <SectionHead
            eyebrow="In demand"
            title="The skills that are actually being hired for"
            sub="Openings are indicative counts across Indian job boards this quarter. Trend is year-on-year growth in postings."
          />

          <div className="skill-marquee">
            {popularSkills.map((s) => (
              <span className="skill-pill" key={s.id}>
                {s.name}
                <span className="trend">
                  <TrendingUp size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
                  {s.trend}
                </span>
                <span className="jobs">{s.jobs}</span>
              </span>
            ))}
          </div>

          <div className="center mt-32">
            <Link to="/skill-gap" className="link-arrow">
              Check which of these you already have <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section className="section" id="how">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Five steps from confused to interview-ready"
            sub="No entrance test, no paid unlock. Just a structured plan that adapts to where you actually are."
          />

          <div className="steps-grid">
            {howItWorks.map((s) => (
              <div className="step-card" key={s.step}>
                <div className="step-num">{s.step}</div>
                <div className="step-icon">
                  <Icon name={s.icon} size={19} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ AI feature */}
      <section className="section section-grey">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 48 }}>
            <div>
              <span className="eyebrow">Skill gap analyzer</span>
              <h2 className="h2">Know exactly what is standing between you and the role</h2>
              <p className="section-sub">
                Add your current skills and a target role. SkillBridge scores your coverage against that role's real
                requirements, ranks the missing skills by hiring weight, and builds a six-week plan around them.
              </p>

              <ul className="opp-list mt-24">
                <li>
                  <CheckCircle2 size={17} />
                  Weighted match score — core skills count for more than bonus ones
                </li>
                <li>
                  <CheckCircle2 size={17} />
                  Missing skills ranked by how often recruiters screen for them
                </li>
                <li>
                  <CheckCircle2 size={17} />
                  Roadmap topics and free resources mapped to each gap
                </li>
                <li>
                  <CheckCircle2 size={17} />
                  Honest about limits: this is guidance, not a placement guarantee
                </li>
              </ul>

              <div className="row gap-12 mt-32 wrap">
                <Link to="/skill-gap" className="btn btn-primary">
                  Analyze my skills <ArrowRight size={17} />
                </Link>
                <Link to="/assistant" className="btn btn-ghost">
                  <Sparkles size={16} /> Ask the assistant
                </Link>
              </div>
            </div>

            <div className="card card-pad" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <div className="tiny muted">Target role</div>
                  <div className="strong" style={{ fontSize: '1.02rem' }}>AI / ML Engineer</div>
                </div>
                <span className="badge badge-amber">Building foundations</span>
              </div>

              <div className="row gap-24 wrap" style={{ alignItems: 'center' }}>
                <div style={{ position: 'relative', width: 108, height: 108, flex: 'none' }}>
                  <svg width="108" height="108" viewBox="0 0 108 108" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="54" cy="54" r="46" fill="none" stroke="var(--grey-100)" strokeWidth="10" />
                    <circle
                      cx="54"
                      cy="54"
                      r="46"
                      fill="none"
                      stroke="url(#homeRing)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 46}
                      strokeDashoffset={2 * Math.PI * 46 * (1 - 0.43)}
                    />
                    <defs>
                      <linearGradient id="homeRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <strong style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>43%</strong>
                      <div className="tiny muted">match</div>
                    </div>
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 150 }}>
                  <div className="small muted mb-8">Highest-priority gaps</div>
                  {[
                    { name: 'PyTorch', pct: 92 },
                    { name: 'MLOps', pct: 74 },
                    { name: 'Linear Algebra', pct: 61 },
                  ].map((g) => (
                    <div key={g.name} style={{ marginBottom: 10 }}>
                      <div className="row" style={{ justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                        <span>{g.name}</span>
                        <span className="muted">{g.pct}% weight</span>
                      </div>
                      <div className="progress" style={{ height: 5 }}>
                        <div className="progress-bar" style={{ width: `${g.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="alert alert-info mt-24" style={{ fontSize: '0.79rem' }}>
                <Zap size={15} style={{ flex: 'none', marginTop: 2 }} />
                <span>
                  Demo illustration. Run the analyzer yourself for a score computed from your own skills — the numbers are
                  calculated, not sampled.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
      <section className="stats-band">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-block" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
                <em>{s.sub}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- testimonials */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Student stories"
            title="What changed for students who stuck with the plan"
            sub="Names and colleges are illustrative of the kind of student SkillBridge is built for."
          />

          <div className="testimonial-grid">
            {testimonials.slice(0, 3).map((t) => (
              <article className="testimonial-card" key={t.id}>
                <div className="stars" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < t.rating ? 'currentColor' : 'none'} strokeWidth={1.6} />
                  ))}
                </div>
                <Quote size={20} style={{ color: 'var(--purple-300)', marginBottom: 10 }} />
                <blockquote>{t.quote}</blockquote>
                <div className="testimonial-person">
                  <span className="avatar" style={{ background: `linear-gradient(135deg, ${t.accent}, #2563EB)` }}>
                    {t.initials}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.college}</span>
                    <em>{t.role}</em>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="row gap-24 mt-32 wrap" style={{ justifyContent: 'center' }}>
            <span className="row gap-8 small muted">
              <Users size={15} /> 48,000+ students
            </span>
            <span className="row gap-8 small muted">
              <GraduationCap size={15} /> 320+ colleges
            </span>
            <span className="row gap-8 small muted">
              <BriefcaseBusiness size={15} /> 7 career tracks
            </span>
            <span className="row gap-8 small muted">
              <BarChart3 size={15} /> Progress tracked per topic
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CTA band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <span className="badge badge-purple" style={{ marginBottom: 18 }}>
              <Sparkles size={12} /> Free for students
            </span>
            <h2>Your placement season starts earlier than you think</h2>
            <p>
              Two minutes to set up, one clear roadmap out. Start with a career track, or run the skill gap analyzer and let
              it decide what you should learn first.
            </p>
            <div className="ctas">
              <Link to="/register" className="btn btn-white btn-lg">
                Create free account <ArrowRight size={17} />
              </Link>
              <Link to="/roadmaps" className="btn btn-outline-white btn-lg">
                <Play size={16} /> Browse learning paths
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
