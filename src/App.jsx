import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import jpii from './assets/jpii.jpg'
import stanley from './assets/stanley.jpg'
import nico from './assets/nico.jpg'
import adib from './assets/momath.webp'
import marinhacksLogo from './assets/marinhacks.png'

const EVENT_DATE = new Date('2026-08-02T08:00:00-08:00')

const schedule = [
  { time: '8:00 AM', title: 'Check-in', desc: 'Participants arrive and register', detail: 'Check in at the door of the JPII student center. Remember to bring your participant waiver. Participants can get their setup ready and wait for the opening ceremony.' },
  { time: '8:15 AM', title: 'Welcome Presentation', desc: 'Opening remarks and introductions', detail: 'Opening remarks and introductions. We will introduce the MarinHacks Team, Sponsors, Judges and more.' },
  { time: '8:30 AM', title: 'Theme Reveal & Start', desc: 'Theme is announced — hacking begins!', detail: 'We will finally announce the overall theme and tracks. Right after the presentation, Hacking Begins!' },
  { time: '9:00 AM', title: "Nico Zametto's Workshop", desc: 'How to Hackathon', detail: "Nico Zametto, a 3x Hackathon Winner, will give a workshop and presentation about 'How to Hackathon.' Hackathons are not just about creating a product or service, but presenting it well in the short ammount of demo time." },
  { time: '10:00 AM', title: 'Chess Tournament', desc: 'Take a break and compete in the chess tournament', detail: 'Starting at 10:00, we will host a chess tournament throughout the duration of the hackathon. You will face off in a single elimination bracket style tournament of 5 min. Blitz games. Winner gets some swag' },
  { time: '12:00 PM', title: 'Lunch', desc: 'Catered lunch break — recharge and network', detail: 'Lunch will be consisted of assorted sandwhiches and salad. Take a break from all the programming and refuel.' },
  { time: '1:00 PM', title: 'Boba Break', desc: 'Boba for everyone — keep the energy up', detail: 'Thanks to our local sponsor, Sharetea, those who signed up for a Boba drink during registration will recieve free Boba.' },
  { time: '3:00 PM', title: 'Code this Algorithm', desc: 'What are you without your agent?', detail: 'What are you without your agent? The era of vibecoding has made us all forget about real coding. In a bracket style first to finish tournament, go 1v1 against fellow programmers to see who can write accurate algorithms quickly, ON PAPER!!!' },
  { time: '6:00 PM', title: 'Submissions Due', desc: 'All projects must be submitted by 6:00 PM', detail: 'All projects must be submitted on DevPost by 6:00 PM. No exceptions. Any github commit after 6:00 will be a immediate disqualifcation. Of course, you can refine your presentation and demo.' },
  { time: '6:10 PM', title: 'Pizza Party', desc: 'Catered dinner before the judging starts', detail: 'Eat some Costco pizza before you present to the judges. You better refuel up!' },
  { time: '6:30 PM', title: 'Judging Starts', desc: 'Judging Schedule released', detail: 'Teams will be called to a room to present in front of 3 judges. Be ready to present what you have been working on for so long.' },
  { time: '7:30 PM', title: 'Geoguessr & Trivia', desc: 'Tournament and trivia while winners are tallied', detail: 'Hosted by Alex Willard, all participants are invited to participate in the Geoguessr tournament while winners are being tallied up' },
  { time: '8:00 PM', title: 'Closing Ceremony', desc: 'Winners announced and closing remarks', detail: 'No matter win or lose, you should leave the hackathon feeling proud of what you accomplished in such a short amount of time' },
]

const faqs = [
  {
    q: 'Who can participate?',
    a: 'MarinHacks is open to high school students who are 18 or younger on August 2nd, the day of the event. Qualified middle school students may appeal once the application is available. All skill levels are welcomed, though we recommend that you come in with a basic knowledge of programming and project management.',
  },
  {
    q: 'Is it free to attend?',
    a: 'Yes! MarinHacks is completely free to attend. We will provide catered meals, snacks, and all the resources you need to build your project.',
  },
  {
    q: 'What should I bring?',
    a: 'You should bring a portable laptop, charger, drinks, and snacks. Please do not bring anything too large, ex. External Monitors, 3D Printers. If you have any questions of what to bring, contact us through email or Discord.',
  },
  {
    q: 'Can I work alone or do I need a team?',
    a: 'Yes you can work alone! However, we highly encourage you find and work with a team. You learn many valuable lessons through code collaboration and version control.',
  },
  {
    q: 'Where is MarinHacks hosted?',
    a: <>{"MarinHacks will be held at the Marin Catholic's John Paul II Student Center. "}<a href="https://www.marincatholic.org/about/campus-map" target="_blank" rel="noreferrer" className="faq-link">View the campus map</a>.</>,
  },
  {
    q: 'What kind of projects can I build?',
    a: 'Anything! Websites, software, mobile apps, etc. Hardware Hacks are allowed, but are discouraged since no pre-built hardware projects are allowed and because of the short working time',
  },
  {
    q: "Is there a theme?",
    a: "Yes, there is a theme and it will be revealed during the opening ceremony. All projects, (even in different tracks), must relate to the theme.",
  },
  {
    q: "What are the prizes?",
    a: "Currently, prizes are not finalized, but expect Amazon gift cards, API credits, and cool tech for the winners.",
  }
]

const leads = [
  { name: 'Stanley Ho', role: 'Lead Director', initials: 'S', photo: stanley, linkedin: 'https://www.linkedin.com/in/stanley-ho-66748a338/' },
  { name: 'Nico Zametto', role: 'Lead Director', initials: 'N', photo: nico, linkedin: 'https://www.linkedin.com/in/nico-zametto-a862643b4/' },
]

const organizers = [
  { name: 'Gavin Perry', role: 'Organizer', initials: 'G' },
  { name: 'Alex Willard', role: 'Organizer', initials: 'A', linkedin: 'https://www.linkedin.com/in/alex-willard-14aa5838b/' },
  { name: 'Chase Hatch', role: 'Organizer', initials: 'CH' },
  { name: 'Joseph Colombo', role: 'Volunteer', initials: 'JC' },
]

const advisors = [
  { name: 'Mr. Adib', role: 'Faculty Advisor', photo: adib, initials: 'MA' },
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

function LinkedInIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

/* ── Team member card ── */
function TeamCard({ member, delay, isLead }) {
  const card = (
    <RevealItem className={`team-card${isLead ? ' team-card-lead' : ''}${member.linkedin ? ' team-card-link' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {member.photo
        ? <img src={member.photo} alt={member.name} className="team-avatar team-avatar-photo" />
        : <div className="team-avatar">{member.initials}</div>
      }
      <h4>{member.name}</h4>
      <p>{member.role}</p>
      {member.linkedin && <span className="team-linkedin"><LinkedInIcon /></span>}
    </RevealItem>
  )
  return member.linkedin
    ? <a href={member.linkedin} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{card}</a>
    : card
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
  const [hoveredEvent, setHoveredEvent] = useState(schedule[0])

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
        <div className="nav-logo"><img src={marinhacksLogo} alt="MarinHacks" className="nav-logo-img" /></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#sponsors">Sponsors & Judges</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="https://hcb.hackclub.com/donations/start/marinhacks" target="_blank" rel="noreferrer" className="nav-donate">Donate</a></li>
          <li><a href="https://forms.gle/5eGxKWadr2QK13Lb7" target="_blank" rel="noreferrer" className="nav-cta">Apply Now</a></li>
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
          <p className="hero-date">August 2, 2026 · Marin Catholic JPII Student Center, Kentfield CA</p>

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

          <div className="hero-btns">
            <a href="https://forms.gle/5eGxKWadr2QK13Lb7" target="_blank" rel="noreferrer" className="btn-primary">
              Apply Now
            </a>
            <a href="https://discord.gg/S6rR2MFm6r" target="_blank" rel="noreferrer" className="btn-secondary">
              Join our Discord
            </a>
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
          <span className="stat-number"><AnimatedNumber value="100" suffix="+" /></span>
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
                We are trying to bring hackathons into Marin County and grow a STEM culture in our community.

              </p>
            </div>
            <div className={`venue-img-wrap reveal${aboutVisible ? ' visible' : ''}`} style={{ transitionDelay: '150ms' }}>
              <img src={jpii} alt="JPII Student Center at Marin Catholic" className="venue-img" />
              <p className="venue-caption">John Paul II Student Center · Marin Catholic, Kentfield CA</p>
            </div>
          </div>

          <div className="about-cards-row">
            {[
              { title: 'Theme-Based', desc: 'Build projects around a revealed theme which will be announced day of' },
              { title: 'Catered Food', desc: 'Lunch and dinner provided. Stay fueled and focused all day.' },
              { title: 'Real Prizes', desc: 'Gift cards and awards for top teams judged by industry professionals.' },
              { title: 'All Skill Levels', desc: 'Beginners welcome. Solo or team. Form groups on the day of the event.' },
            ].map((card, i) => (
              <div className={`about-card reveal${aboutVisible ? ' visible' : ''}`} key={card.title} style={{ transitionDelay: `${300 + i * 100}ms` }}>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
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
                >
                  <RevealItem className={`timeline-item${hoveredEvent === item ? ' hovered' : ''}`} style={{ transitionDelay: `${i * 80}ms` }} threshold={0.3}>
                    <div className="timeline-time">
                      {item.time.replace(/(AM|PM)/, '\u2009$1')}
                    </div>
                    <div className="timeline-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </RevealItem>
                </div>
              ))}
            </div>

            <div className="schedule-detail-panel">
              <div className="schedule-detail-card" key={hoveredEvent.time}>
                <div className="schedule-detail-time">{hoveredEvent.time}</div>
                <h3 className="schedule-detail-title">{hoveredEvent.title}</h3>
                <p className="schedule-detail-desc">{hoveredEvent.detail ?? hoveredEvent.desc}</p>
              </div>
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
            <div className="sponsors-layout">
              <div>
                <p className="section-label">Sponsors & Judges</p>
                <h2 className="section-title">Coming soon</h2>
                <p className="section-desc">
                  We are currently reaching out to sponsors and judges for MarinHacks.
                  Details will be announced soon.
                </p>
              </div>
              <div className="sponsors-cta-wrap">
                <a href="https://forms.gle/XdaH5fmDHNMemKuc8" target="_blank" rel="noreferrer" className="sponsors-cta">
                  Interested in sponsoring or judging?
                  <span className="sponsors-cta-apply">Apply Here</span>
                </a>
              </div>
            </div>
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
          <a href="https://forms.gle/5eGxKWadr2QK13Lb7" target="_blank" rel="noreferrer" className="btn-primary btn-glow">Apply Now</a>
          <p className="waiver-note">
            All participants must print and sign the{' '}
            <a href="https://docs.google.com/document/d/e/2PACX-1vR5KcvjyTwVs-asI3aMDXpFJMex1yTQ93TRo0HLrkOJDPQEatcM-jcOJCqxUvtTLGlhOPWyEa9Bmvx2/pub" target="_blank" rel="noreferrer" className="faq-link">participant waiver</a>{' '}
            before entering the venue.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Marin<span>Hacks</span></div>
        <div className="footer-contact">
          <a href="mailto:sho2027@marincatholic.org">sho2027@marincatholic.org</a>
          <a href="mailto:nzametto2027@marincatholic.org">nzametto2027@marincatholic.org</a>
        </div>
        <p className="footer-copy">© 2026 MarinHacks · Marin Catholic · Kentfield, CA</p>
        <p className="footer-hcb">
          Fiscally sponsored by{' '}
          <a href="https://hcb.hackclub.com/marinhacks" target="_blank" rel="noreferrer" className="footer-hcb-link">HCB</a>
        </p>
        <div className="footer-socials">
          <a href="https://discord.gg/S6rR2MFm6r" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Discord">
            <DiscordIcon />
          </a>
        </div>
      </footer>
    </>
  )
}
