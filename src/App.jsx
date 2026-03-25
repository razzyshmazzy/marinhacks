import { useState } from 'react'
import './App.css'

const schedule = [
  { time: '7:00 AM', title: 'Setup', desc: 'Organizers set up the venue' },
  { time: '8:00 AM', title: 'Check-in', desc: 'Participants arrive and register' },
  { time: '8:30 AM', title: 'Welcome Presentation', desc: 'Opening remarks, theme reveal, and rules' },
  { time: '9:00 AM', title: 'Hacking Begins', desc: 'Teams start building their projects' },
  { time: '12:00 PM', title: 'Lunch', desc: 'Catered lunch break — recharge and network' },
  { time: '6:00 PM', title: 'Dinner', desc: 'Catered dinner as teams finalize projects' },
  { time: '6:30 PM', title: 'Judging Starts', desc: 'Judges visit each team for demos' },
  { time: '7:30 PM', title: 'Winning Presentations', desc: 'Finalists present to the full audience' },
  { time: '8:00 PM', title: 'Cleanup & Closing', desc: 'Awards, photos, and wrap-up' },
]

const faqs = [
  {
    q: 'Who can participate?',
    a: 'MarinHacks is open to middle and high school students from around the Bay Area. No prior coding experience is required — all skill levels are welcome!',
  },
  {
    q: 'Is it free to attend?',
    a: 'Yes! MarinHacks is completely free to attend. We will provide catered meals, snacks, and all the resources you need to build your project.',
  },
  {
    q: 'What should I bring?',
    a: 'Bring your laptop, charger, and any hardware you plan to use. We will provide WiFi, power strips, and a creative environment to work in.',
  },
  {
    q: 'Can I work alone or do I need a team?',
    a: 'Both are welcome! You can register solo and find teammates on the day of the event, or come with a pre-formed team of up to 4 members.',
  },
  {
    q: 'Where is MarinHacks hosted?',
    a: 'MarinHacks will be held at the Marin Catholic Library — a spacious, comfortable venue perfect for a full-day hackathon.',
  },
  {
    q: 'What kind of projects can I build?',
    a: 'Anything goes — web apps, mobile apps, hardware hacks, games, and more. Projects should relate to the announced theme, revealed at the opening presentation.',
  },
]

const team = [
  { name: 'Nico', role: 'Lead Director', initials: 'N' },
  { name: 'Stanley Ho', role: 'Lead Director', initials: 'S' },
  { name: 'Gavin Perry', role: 'Organizer', initials: 'G' },
  { name: 'Alex Williard', role: 'Organizer', initials: 'A' },
  { name: 'Mr. Adib', role: 'Faculty Advisor', initials: 'MA' },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {q}
        <span className={`faq-icon${open ? ' open' : ''}`}>+</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  )
}

export default function App() {
  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">Marin<span>Hacks</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#register" className="nav-cta">Register</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">Marin Catholic's First Hackathon</div>
          <h1>
            Marin<span className="highlight">Hacks</span>
          </h1>
          <p className="hero-sub">Bay Area's newest high school hackathon</p>
          <p className="hero-date">August 2025 &nbsp;·&nbsp; MC Library, Kentfield CA</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('register').scrollIntoView({ behavior: 'smooth' })}>
              Register Now
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="stat">
          <span className="stat-number">12</span>
          <span className="stat-label">Hours of Hacking</span>
        </div>
        <div className="stat">
          <span className="stat-number">50–100</span>
          <span className="stat-label">Participants</span>
        </div>
        <div className="stat">
          <span className="stat-number">$350+</span>
          <span className="stat-label">In Prizes</span>
        </div>
        <div className="stat">
          <span className="stat-number">Free</span>
          <span className="stat-label">To Attend</span>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
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
              <div className="about-card">
                <div className="about-card-icon">💡</div>
                <h4>Theme-Based</h4>
                <p>Build projects around a revealed theme — Connection, Education, and more.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🍕</div>
                <h4>Catered Food</h4>
                <p>Lunch and dinner provided. Stay fueled and focused all day.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🏆</div>
                <h4>Real Prizes</h4>
                <p>Gift cards and awards for top teams judged by industry professionals.</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon">🤝</div>
                <h4>All Skill Levels</h4>
                <p>Beginners welcome. Solo or team. Form groups on the day of the event.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="schedule-section">
        <div className="container">
          <p className="section-label">Schedule</p>
          <h2 className="section-title">Day of the event</h2>
          <p className="section-desc">
            A full day of building, learning, and competing. All times are approximate.
          </p>
          <div className="timeline">
            {schedule.map((item) => (
              <div className="timeline-item" key={item.time}>
                <div className="timeline-time">{item.time}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIZES */}
      <section id="prizes">
        <div className="container">
          <p className="section-label">Prizes</p>
          <h2 className="section-title">Compete for recognition</h2>
          <p className="section-desc">
            Prize amounts grow with sponsorship. The values below are our guaranteed minimums.
          </p>
          <div className="prizes-grid">
            <div className="prize-card gold-prize">
              <div className="prize-rank">1st Place</div>
              <div className="prize-trophy">🥇</div>
              <h3>$200</h3>
              <p>Gift card + trophy + eternal bragging rights</p>
            </div>
            <div className="prize-card">
              <div className="prize-rank">2nd Place</div>
              <div className="prize-trophy">🥈</div>
              <h3>$100</h3>
              <p>Gift card + certificate of achievement</p>
            </div>
            <div className="prize-card">
              <div className="prize-rank">3rd Place</div>
              <div className="prize-trophy">🥉</div>
              <h3>$50</h3>
              <p>Gift card + certificate of achievement</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="schedule-section">
        <div className="container">
          <p className="section-label">Team</p>
          <h2 className="section-title">Meet the organizers</h2>
          <p className="section-desc">
            MarinHacks is organized by the Marin Catholic Computer Science Club.
          </p>
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="team-avatar">{member.initials}</div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common questions</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="register" className="cta-section">
        <div className="container">
          <p className="section-label">Register</p>
          <h2 className="section-title">Ready to build?</h2>
          <p className="section-desc">
            Spots are limited. Sign up to secure your place at MarinHacks and be the first to hear
            about the theme, sponsors, and updates.
          </p>
          <button className="btn-primary">Apply Now — It's Free</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Marin<span>Hacks</span></div>
        <p className="footer-copy">© 2025 MarinHacks · Marin Catholic · Kentfield, CA</p>
      </footer>
    </>
  )
}
