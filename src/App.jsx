import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

const EVENT_DATE = new Date('2026-08-02T08:00:00-07:00')

const schedule = [
  { time: '8:00 AM', title: 'Check-in', desc: 'Participants arrive and register' },
  { time: '8:30 AM', title: 'Welcome Presentation', desc: 'Opening remarks, theme reveal, and rules' },
  { time: '9:00 AM', title: 'Hacking Begins', desc: 'Teams start building their projects' },
  { time: '12:00 PM', title: 'Lunch', desc: 'Catered lunch break — recharge and network' },
  { time: '6:00 PM', title: 'Dinner', desc: 'Catered dinner as teams finalize projects' },
  { time: '6:30 PM', title: 'Judging Starts', desc: 'Judges visit each team for demos' },
  { time: '7:30 PM', title: 'Winning Presentations', desc: 'Finalists present to the full audience' },
]

const faqs = [
  {
    q: 'Who can participate?',
    a: 'MarinHacks is open only high school students. Qualified middle school students may appeal once the application is available. All skill levels are welcomed, though we recommend that you come in with a basic knowledge of programming and project management.',
  },
  {
    q: 'Is it free to attend?',
    a: 'Yes! MarinHacks is completely free to attend. We will provide catered meals, snacks, and all the resources you need to build your project.',
  },
  {
    q: 'What should I bring?',
    a: 'You should bring a portable laptop, charger, drinks, and snacks. Please do not bring anything too large, ex. External Monitors, 3d Printers. If you have any questions of what to bring, contact us through email or discord',
  },
  {
    q: 'Can I work alone or do I need a team?',
    a: 'The application is coming soon — project submissions must be in a team of at least 2. Max amount of teamates in a group are 4, no exceptions. If you can not find a teamate, contact us on email or discord and we will try to arrange a teamate.',
  },
  {
    q: 'Where is MarinHacks hosted?',
    a: <>{"MarinHacks will be held at the Marin Catholic's John Paul II Student Center. "}<a href="https://www.marincatholic.org/about/campus-map" target="_blank" rel="noreferrer" className="faq-link">View the campus map</a>.</>,
  },
  {
    q: 'What kind of projects can I build?',
    a: 'NO HARDWARE HACKS, but besides that, anything goes — web apps, mobile apps, games, and more. Projects should relate to the announced theme, revealed at the opening presentation.',
  },
  {
    q: "Is there a theme?",
    a: "Yes, there is a theme and it will be revealed during the opening ceromony. All projects, (even in different tracks), must relate to the theme. ",
  },
  {
    q: "What are the prizes?",
    a: "Currently, prizes are not finalized, but except Amazon giftcards, API credits, and cool tech for the winners.",
  }
]

const leads = [
  { name: 'Nico Zametto', role: 'Lead Director', initials: 'N' },
  { name: 'Stanley Ho', role: 'Lead Director', initials: 'S' },
]

const organizers = [
  { name: 'Gavin Perry', role: 'Organizer', initials: 'G' },
  { name: 'Alex Williard', role: 'Organizer', initials: 'A' },
  { name: 'Chase Hatch', role: 'Organizer', initials: 'CH' },
  { name: 'Joseph Colombo', role: 'Volunteer', initials: 'JC' },
]

const advisors = [
  { name: 'Mr. Adib', role: 'Faculty Advisor', initials: 'MA' },
]

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function getTimeLeft(targetDate) {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(value.replace(/[^0-9]/g, ''), 10)
        if (isNaN(num)) { setDisplay(value); return }
        const prefix = value.match(/^[^0-9]*/)?.[0] || ''
        const dur = 1500
        const start = performance.now()
        const animate = (now) => {
          const t = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          setDisplay(prefix + Math.round(eased * num))
          if (t < 1) requestAnimationFrame(animate)
          else setDisplay(value)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ── Starfield canvas ── */
function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        da: (Math.random() - 0.5) * 0.015,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.da
        if (s.alpha > 1 || s.alpha < 0.1) s.da *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${s.alpha.toFixed(2)})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="starfield" />
}

/* ── Floating shapes ── */
function FloatingShapes() {
  return (
    <div className="floating-shapes" aria-hidden="true">
      <div className="float-shape shape-1" />
      <div className="float-shape shape-2" />
      <div className="float-shape shape-3" />
      <div className="float-shape shape-4" />
      <div className="float-shape shape-5" />
    </div>
  )
}

/* ── FAQ with smooth accordion ── */
function FaqItem({ q, a, delay }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [ref, visible] = useReveal()

  return (
    <div className={`faq-item reveal${visible ? ' visible' : ''}`} ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {q}
        <span className={`faq-icon${open ? ' open' : ''}`}>+</span>
      </button>
      <div
        className="faq-answer-wrap"
        style={{ maxHeight: open ? contentRef.current?.scrollHeight : 0 }}
      >
        <div className="faq-answer" ref={contentRef}>{a}</div>
      </div>
    </div>
  )
}

/* ── Reveal wrapper for items in loops ── */
function RevealItem({ children, className = '', style = {}, threshold = 0.2 }) {
  const [ref, visible] = useReveal(threshold)
  return (
    <div className={`${className} reveal${visible ? ' visible' : ''}`} ref={ref} style={style}>
      {children}
    </div>
  )
}

/* ── Team member card ── */
function TeamCard({ member, delay, isLead }) {
  return (
    <RevealItem className={`team-card${isLead ? ' team-card-lead' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="team-avatar">{member.initials}</div>
      <h4>{member.name}</h4>
      <p>{member.role}</p>
    </RevealItem>
  )
}

/* ── Main App ── */
export default function App() {
  const [heroRef, heroVisible] = useReveal(0.1)
  const [statsRef, statsVisible] = useReveal(0.2)
  const [aboutRef, aboutVisible] = useReveal(0.1)
  const [schedRef, schedVisible] = useReveal(0.1)
  const [teamRef, teamVisible] = useReveal(0.1)
  const [sponsorsRef, sponsorsVisible] = useReveal(0.1)
  const [faqRef, faqVisible] = useReveal(0.1)
  const [ctaRef, ctaVisible] = useReveal(0.1)

  const countdown = useCountdown(EVENT_DATE)
  const [hoveredEvent, setHoveredEvent] = useState(null)

  /* Parallax on hero on mouse move */
  const heroContainerRef = useRef(null)
  const handleMouseMove = useCallback((e) => {
    const el = heroContainerRef.current
    if (!el) return
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
  }, [])

  return (
    <>
      <Starfield />

      {/* NAV */}
      <nav>
        <div className="nav-logo">Marin<span>Hacks</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#sponsors">Sponsors & Judges</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#register" className="nav-cta">Application Coming Soon</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home" onMouseMove={handleMouseMove} ref={heroContainerRef}>
        <div className="hero-bg" />
        <div className="hero-grid" />
        <FloatingShapes />
        <div className={`hero-content${heroVisible ? ' visible' : ''}`} ref={heroRef}>
          <div className="hero-badge">Marin Catholic's First Hackathon</div>
          <h1>
            Marin<span className="highlight">Hacks</span>
          </h1>
          <p className="hero-sub">Bay Area's newest high school hackathon</p>
          <p className="hero-date">August 2, 2026 · MC Library, Kentfield CA</p>

          {/* Countdown Timer */}
          <div className="countdown">
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-sep">:</div>
            <div className="countdown-unit">
              <span className="countdown-number">{String(countdown.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-sep">:</div>
            <div className="countdown-unit">
              <span className="countdown-number">{String(countdown.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-sep">:</div>
            <div className="countdown-unit">
              <span className="countdown-number">{String(countdown.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>

          <p className="hero-details-note">More details coming soon — stay tuned!</p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}>
              Application Coming Soon
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className={`stats${statsVisible ? ' visible' : ''}`} ref={statsRef}>
        <div className="stat" style={{ transitionDelay: '0ms' }}>
          <span className="stat-number"><AnimatedNumber value="12" /></span>
          <span className="stat-label">Hours of Hacking</span>
        </div>
        <div className="stat" style={{ transitionDelay: '100ms' }}>
          <span className="stat-number">50-100</span>
          <span className="stat-label">Participants</span>
        </div>
        <div className="stat" style={{ transitionDelay: '200ms' }}>
          <span className="stat-number"><AnimatedNumber value="$1000" suffix="+" /></span>
          <span className="stat-label">In Prizes</span>
        </div>
        <div className="stat" style={{ transitionDelay: '300ms' }}>
          <span className="stat-number">Free</span>
          <span className="stat-label">To Attend</span>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container" ref={aboutRef}>
          <div className={`about-grid reveal${aboutVisible ? ' visible' : ''}`}>
            <div>
              <p className="section-label">About</p>
              <h2 className="section-title">Build something amazing in 12 hours</h2>
              <p className="section-desc">
                MarinHacks is Marin Catholic's inaugural hackathon — a free, 12-hour event open to
                middle and high school students across the Bay Area. Come with an idea, leave with
                a project, and compete for prizes alongside hundreds of fellow builders.
              </p>
              <br />
              <p className="section-desc">
                Inspired by hackathons at Branson, Monte Vista, Irvington, and Saint Francis, we're
                bringing that same energy to Marin — to grow CS culture in our community and give
                students a platform to create.
              </p>
            </div>
            <div className="about-cards">
              {[
                { title: 'Theme-Based', desc: 'Build projects around a revealed theme — Connection, Education, and more.' },
                { title: 'Catered Food', desc: 'Lunch and dinner provided. Stay fueled and focused all day.' },
                { title: 'Real Prizes', desc: 'Gift cards and awards for top teams judged by industry professionals.' },
                { title: 'All Skill Levels', desc: 'Beginners welcome. Solo or team. Form groups on the day of the event.' },
              ].map((card, i) => (
                <div className={`about-card reveal${aboutVisible ? ' visible' : ''}`} key={card.title} style={{ transitionDelay: `${200 + i * 100}ms` }}>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="schedule-section">
        <div className="container" ref={schedRef}>
          <div className={`reveal${schedVisible ? ' visible' : ''}`}>
            <p className="section-label">Schedule</p>
            <h2 className="section-title">Day of the event</h2>
            <p className="section-desc">
              A full day of building, learning, and competing. All times are approximate.
            </p>
          </div>
          <div className="schedule-layout">
            <div className="timeline">
              {schedule.map((item, i) => (
                <div
                  key={item.time}
                  onMouseEnter={() => setHoveredEvent(item)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <RevealItem className={`timeline-item${hoveredEvent === item ? ' hovered' : ''}`} style={{ transitionDelay: `${i * 80}ms` }} threshold={0.3}>
                    <div className="timeline-time">{item.time}</div>
                    <div className="timeline-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </RevealItem>
                </div>
              ))}
            </div>

            <div className="schedule-detail-panel">
              {hoveredEvent && (
                <div className="schedule-detail-card" key={hoveredEvent.time}>
                  <div className="schedule-detail-time">{hoveredEvent.time}</div>
                  <h3 className="schedule-detail-title">{hoveredEvent.title}</h3>
                  <p className="schedule-detail-desc">{hoveredEvent.desc}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="schedule-section">
        <div className="container" ref={teamRef}>
          <div className={`reveal${teamVisible ? ' visible' : ''}`}>
            <p className="section-label">Team</p>
            <h2 className="section-title">Meet the organizers</h2>
            <p className="section-desc">
              MarinHacks is organized by the Marin Catholic Computer Science Club.
            </p>
          </div>

          {/* Lead Directors */}
          <div className="team-leads">
            {leads.map((member, i) => (
              <TeamCard key={member.name} member={member} delay={i * 100} isLead />
            ))}
          </div>

          {/* Organizers & Volunteers */}
          <div className="team-grid">
            {organizers.map((member, i) => (
              <TeamCard key={member.name} member={member} delay={(i + 2) * 100} />
            ))}
          </div>

          {/* Advisors */}
          <div className="team-advisors">
            {advisors.map((member, i) => (
              <TeamCard key={member.name} member={member} delay={(i + 6) * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS & JUDGES */}
      <section id="sponsors">
        <div className="container" ref={sponsorsRef}>
          <div className={`reveal${sponsorsVisible ? ' visible' : ''}`}>
            <p className="section-label">Sponsors & Judges</p>
            <h2 className="section-title">Coming soon</h2>
            <p className="section-desc">
              We are currently reaching out to sponsors and judges for MarinHacks.
              Interested in sponsoring or judging? Reach out to us — details will be announced soon.
            </p>
            <div className="tbd-placeholder">
              <div className="tbd-box">
                <span className="tbd-text">Sponsors TBD</span>
              </div>
              <div className="tbd-box">
                <span className="tbd-text">Judges TBD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container" ref={faqRef}>
          <div className={`reveal${faqVisible ? ' visible' : ''}`}>
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div className="faq-list">
            <div className="faq-col">
              {faqs.filter((_, i) => i % 2 === 0).map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} delay={i * 80} />
              ))}
            </div>
            <div className="faq-col">
              {faqs.filter((_, i) => i % 2 !== 0).map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} delay={i * 80 + 40} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="register" className="cta-section" ref={ctaRef}>
        <div className={`container reveal${ctaVisible ? ' visible' : ''}`}>
          <p className="section-label">Register</p>
          <h2 className="section-title">Ready to build?</h2>
          <p className="section-desc">
            Spots are limited. Sign up to secure your place at MarinHacks and be the first to hear
            about the theme, sponsors, and updates. More details to come.
          </p>
          <button className="btn-primary btn-glow">Application Coming Soon</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Marin<span>Hacks</span></div>
        <p className="footer-copy">© 2026 MarinHacks · Marin Catholic · Kentfield, CA</p>
      </footer>
    </>
  )
}
