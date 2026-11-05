import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Route as RouteIcon,
  Sparkles,
  User,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/careers', label: 'Explore Careers' },
  { to: '/roadmaps', label: 'Learning Paths' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

const mobileExtra = [
  { to: '/assistant', label: 'AI Career Assistant', icon: MessageSquare },
  { to: '/skill-gap', label: 'Skill Gap Analyzer', icon: BarChart3 },
  { to: '/placement', label: 'Placement Prep', icon: BriefcaseBusiness },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const userRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setUserOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const initials = user?.name
    ? user.name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0].toUpperCase()).join('')
    : 'SB'

  const handleLogout = () => {
    logout()
    setUserOpen(false)
    toast.success('You have been logged out')
    navigate('/')
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="brand" aria-label="SkillBridge home">
            <span className="brand-mark">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 17l4.5-10L12 14l3.5-7L20 17" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Skill<span className="accent">Bridge</span></span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            <Link to="/assistant" className="nav-ai">
              <Sparkles size={15} /> AI Assistant
            </Link>

            {isAuthenticated ? (
              <div className="user-menu" ref={userRef}>
                <button type="button" className="user-menu-btn" onClick={() => setUserOpen((v) => !v)} aria-expanded={userOpen} aria-haspopup="menu">
                  <span className="avatar">{initials}</span>
                  <span className="desktop-only" style={{ fontSize: '0.85rem', fontWeight: 500, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className="desktop-only" style={{ color: 'var(--grey-400)' }} />
                </button>

                {userOpen && (
                  <div className="user-dropdown" role="menu">
                    <div className="user-dropdown-head">
                      <div style={{ fontSize: '0.87rem', fontWeight: 600 }}>{user.name}</div>
                      <div className="tiny muted" style={{ marginTop: 2 }}>{user.email}</div>
                    </div>
                    <Link to="/dashboard" className="dropdown-item" role="menuitem">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                    <Link to="/skill-gap" className="dropdown-item" role="menuitem">
                      <BarChart3 size={16} /> Skill Gap Analyzer
                    </Link>
                    <Link to="/roadmaps" className="dropdown-item" role="menuitem">
                      <RouteIcon size={16} /> My Roadmaps
                    </Link>
                    <Link to="/placement" className="dropdown-item" role="menuitem">
                      <BriefcaseBusiness size={16} /> Placement Prep
                    </Link>
                    <div className="divider" style={{ margin: '6px 0' }} />
                    <button type="button" className="dropdown-item danger" onClick={handleLogout} role="menuitem">
                      <LogOut size={16} /> Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm desktop-only">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}

            <button type="button" className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
          {mobileExtra.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <l.icon size={16} /> {l.label}
              </span>
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                <User size={16} /> Dashboard
              </span>
            </NavLink>
          )}

          <div className="mobile-menu-actions">
            {isAuthenticated ? (
              <button type="button" className="btn btn-ghost" onClick={handleLogout} style={{ gridColumn: '1 / -1' }}>
                <LogOut size={16} /> Log out
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
