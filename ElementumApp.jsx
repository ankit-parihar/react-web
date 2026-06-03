import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Studio", "Services", "Contact", "FAQs"];

const TEAM_AVATARS = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
  "https://randomuser.me/api/portraits/men/45.jpg",
  "https://randomuser.me/api/portraits/men/67.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/33.jpg",
];

const SERVICES = [
  { category: "Office of multiple interest content", title: "Collaborative & partnership" },
  { category: "The hanger US Air force digital experimental", title: "We talk about our weight" },
  { category: "Delta faucet content, social, digital", title: "Piloting digital confidence" },
];

const TESTIMONIALS = [
  { img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { img: "https://randomuser.me/api/portraits/men/52.jpg", active: true },
  { img: "https://randomuser.me/api/portraits/men/63.jpg" },
  { img: "https://randomuser.me/api/portraits/women/21.jpg" },
  { img: "https://randomuser.me/api/portraits/men/74.jpg" },
  { img: "https://randomuser.me/api/portraits/men/85.jpg", large: true },
];

const FOOTER_COLS = [
  { title: "Company", links: ["Home", "Studio", "Service", "Blog"] },
  { title: "Terms & Policies", links: ["Privacy Policy", "Terms & Conditions", "Explore", "Accessibility"] },
  { title: "Follow Us", links: ["Instagram", "LinkedIn", "Youtube", "Twitter"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Decorative SVG shapes
const CurlyBrace = () => (
  <svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 60, height: 120 }}>
    <path d="M60 10 Q10 10 10 50 Q10 80 40 80 Q10 80 10 110 Q10 150 60 150" stroke="#E8B4B8" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

const WaveLine = ({ color = "#F28B82", style = {} }) => (
  <svg viewBox="0 0 500 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", ...style }}>
    <path d="M0 30 Q80 5 160 30 Q240 55 320 30 Q400 5 500 30" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const PurpleLeaf = ({ size = 60 }) => (
  <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size * 1.3 }}>
    <path d="M30 5 Q55 20 55 45 Q55 70 30 75 Q5 70 5 45 Q5 20 30 5Z" fill="#8B5CF6" opacity="0.85" />
  </svg>
);

const RedTriangle = ({ size = 60, flip = false }) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: size, height: size, transform: flip ? "rotate(180deg)" : "none" }}>
    <polygon points="30,5 55,52 5,52" fill="#F06060" />
  </svg>
);

const RedSquare = ({ size = 50 }) => (
  <div style={{ width: size, height: size, background: "#F06060", borderRadius: 2 }} />
);

// Highlight component for colored text backgrounds
const Highlight = ({ children, color }) => (
  <span style={{ background: color, borderRadius: 4, padding: "0 6px", display: "inline" }}>{children}</span>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.95)" : "white",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
      transition: "all 0.3s ease",
      padding: "0 5%",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>Elementum</span>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" style={{
              fontSize: 14, color: "#333", textDecoration: "none", fontFamily: "'DM Sans', sans-serif",
              position: "relative", paddingBottom: 2,
            }}
              onMouseEnter={e => e.target.style.color = "#000"}
              onMouseLeave={e => e.target.style.color = "#333"}
            >{l}</a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(p => !p)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2, background: "#222",
              borderRadius: 2,
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(4px,4px)" : menuOpen && i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
              transition: "all 0.25s ease",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "white", padding: "12px 5% 20px", borderTop: "1px solid #eee" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href="#" style={{ display: "block", padding: "10px 0", fontSize: 15, color: "#333", textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @media(max-width:768px){.desktop-nav{display:none!important}}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;color:#1a1a1a;overflow-x:hidden}
      `}</style>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 60, background: "white", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 5%", textAlign: "center", position: "relative" }}>
        {/* Top decorative shape */}
        <div style={{ position: "absolute", left: "5%", top: 20 }}>
          <CurlyBrace />
        </div>
        <div style={{ position: "absolute", right: "8%", top: 40 }}>
          <PurpleLeaf size={50} />
        </div>

        <FadeIn>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-1px",
            color: "#1a1a1a",
            marginBottom: 24,
          }}>
            The{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              thinkers
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: "#F5C518", borderRadius: 2 }} />
            </span>{" "}
            and <br />
            doers were{" "}
            <Highlight color="#F472B6">&nbsp;changing&nbsp;</Highlight>
            <br />
            the <Highlight color="#86EFAC">&nbsp;status&nbsp;</Highlight> Quo with
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{ fontSize: "clamp(13px,2vw,15px)", color: "#666", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
            We are a team of strategists, designers, communicators, researchers. Together,
            we believe that progress only happens when you refuse to play things safe.
          </p>
        </FadeIn>

        {/* Team avatars */}
        <FadeIn delay={0.25}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16, alignItems: "flex-end" }}>
            {TEAM_AVATARS.map((src, i) => (
              <div key={i} style={{
                width: i === 0 || i === 6 ? 70 : i === 1 || i === 5 ? 80 : i === 2 ? 60 : 72,
                height: i === 0 || i === 6 ? 70 : i === 1 || i === 5 ? 80 : i === 2 ? 60 : 72,
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
              >
                <img src={src} alt="team member" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION: Tomorrow ────────────────────────────────────────────────────────
function TomorrowSection() {
  return (
    <section style={{ padding: "80px 5%", background: "white", position: "relative", overflow: "hidden" }}>
      {/* Background blob */}
      <div style={{
        position: "absolute", right: "30%", top: "10%",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,150,150,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <FadeIn>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem,4vw,2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 20,
              color: "#1a1a1a",
            }}>
              Tomorrow should<br />
              be better than{" "}
              <Highlight color="#86EFAC">&nbsp;today&nbsp;</Highlight>
            </h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, marginBottom: 24, maxWidth: 360 }}>
              We are a team of strategists, designers, communicators, researchers.
              Together, we believe that progress only happens when you refuse to play things safe.
            </p>
            <a href="#" style={{
              fontSize: 13, color: "#1a1a1a", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500,
              borderBottom: "1px solid #1a1a1a", paddingBottom: 2,
              transition: "gap 0.2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.gap = "14px"}
              onMouseLeave={e => e.currentTarget.style.gap = "8px"}
            >
              Read more <span>→</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -10, zIndex: 1 }}>
              <RedSquare size={55} />
            </div>
            <div style={{
              width: "100%", aspectRatio: "1/0.85",
              borderRadius: "50%",
              overflow: "hidden",
              maxWidth: 320, margin: "0 auto",
              border: "3px solid white",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            }}>
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="team meeting" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Connecting wave line */}
            <div style={{ position: "absolute", bottom: -30, left: 0, right: 0 }}>
              <WaveLine color="#F28B82" style={{ height: 40 }} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION: Progress ────────────────────────────────────────────────────────
function ProgressSection() {
  return (
    <section style={{ padding: "80px 5% 100px", background: "white", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <FadeIn>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", bottom: -10, left: 20, zIndex: 1 }}>
              <RedTriangle size={60} />
            </div>
            <div style={{ position: "absolute", top: 20, left: 60, zIndex: 0 }}>
              <RedTriangle size={40} flip />
            </div>
            <div style={{
              width: "100%", aspectRatio: "1/0.85",
              borderRadius: "50%",
              overflow: "hidden",
              maxWidth: 300, margin: "0 auto",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
              position: "relative", zIndex: 2,
            }}>
              <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80" alt="collaboration" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem,4vw,2.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 20,
              color: "#1a1a1a",
            }}>
              See how we can <br />
              <span style={{ textDecoration: "underline", textDecorationColor: "#F5C518", textUnderlineOffset: 4 }}>help you progress</span>
            </h2>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, marginBottom: 24, maxWidth: 360 }}>
              We add a layer of fearless insights and action that allows change makers to
              accelerate their progress in areas such as brand, design, digital, comms
              and social research.
            </p>
            <a href="#" style={{
              fontSize: 13, color: "#1a1a1a", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500,
              borderBottom: "1px solid #1a1a1a", paddingBottom: 2,
              transition: "gap 0.2s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.gap = "14px"}
              onMouseLeave={e => e.currentTarget.style.gap = "8px"}
            >
              Read more <span>→</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION: Services ────────────────────────────────────────────────────────
function ServicesSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ padding: "80px 5%", background: "white", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem,5vw,3rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.15,
            }}>
              What we <Highlight color="#86EFAC">&nbsp;can&nbsp;</Highlight><br />
              <span style={{ textDecoration: "underline", textDecorationColor: "#F5C518", textUnderlineOffset: 5 }}>offer you!</span>
            </h2>
            {/* Wave line beside heading */}
            <div style={{ position: "absolute", right: -160, top: 10, width: 140 }}>
              <WaveLine color="#F28B82" style={{ height: 30 }} />
            </div>
          </div>
        </FadeIn>

        <div style={{ borderTop: "1px solid #e5e5e5" }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr auto",
                  gap: 24,
                  alignItems: "center",
                  padding: "28px 0",
                  borderBottom: "1px solid #e5e5e5",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  borderRadius: 8,
                  paddingLeft: hovered === i ? 12 : 0,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <p style={{ fontSize: 12, color: "#999", lineHeight: 1.5, maxWidth: 160 }}>{s.category}</p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1rem,2.5vw,1.4rem)",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  letterSpacing: "0.02em",
                }}>{s.title}</p>
                <span style={{
                  fontSize: 18,
                  color: "#1a1a1a",
                  transform: hovered === i ? "translateX(6px)" : "none",
                  transition: "transform 0.2s ease",
                  display: "inline-block",
                }}>→</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION: Testimonials ────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section style={{ padding: "80px 5%", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem,3.5vw,2rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
            color: "#1a1a1a",
          }}>
            What our customer <br />says{" "}
            <span style={{
              textDecoration: "underline",
              textDecorationColor: "#F5C518",
              textUnderlineOffset: 5,
              background: "#fff9c4",
              padding: "0 4px",
            }}>About Us</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 32, alignItems: "center" }}>
            {/* Left avatars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: i === 1 ? 64 : 48,
                  height: i === 1 ? 64 : 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}>
                  <img src={TESTIMONIALS[i].img} alt="reviewer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            {/* Testimonial card */}
            <div style={{
              background: "#f8f9fa",
              borderRadius: 16,
              padding: "32px 28px",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              <span style={{ fontSize: 32, color: "#ccc", lineHeight: 1, display: "block", marginBottom: 12 }}>&ldquo;</span>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
                Elementum delivered the site within the timeline as they requested.
                In the end, the client found a 50% increase in traffic within days since
                its launch. They also had an impressive ability to use technologies that
                the company hadn't used, which have also proved to be easy to use and reliable.
              </p>
              <span style={{ fontSize: 32, color: "#ccc", lineHeight: 1, display: "block", marginTop: 12 }}>&rdquo;</span>
            </div>

            {/* Right avatars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              {[3, 4, 5].map(i => (
                <div key={i} style={{
                  width: i === 5 ? 72 : 48,
                  height: i === 5 ? 72 : 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "3px solid white",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}>
                  <img src={TESTIMONIALS[i].img} alt="reviewer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── SECTION: Newsletter ──────────────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setEmail(""); }
  };

  return (
    <section style={{ padding: "80px 5%", background: "#E8F5E9", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 40, top: 30 }}>
        <PurpleLeaf size={55} />
      </div>
      {/* small wave at top */}
      <div style={{ position: "absolute", top: 10, left: "30%", right: 0, opacity: 0.5 }}>
        <WaveLine color="#F28B82" />
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem,5vw,3rem)",
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.15,
            marginBottom: 16,
          }}>
            Subscribe to<br />our newsletter
          </h2>
          <p style={{ fontSize: 14, color: "#555", marginBottom: 32 }}>To make your stay special and even more memorable</p>

          <div style={{ display: "flex", gap: 0, maxWidth: 400, margin: "0 auto", borderRadius: 40, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                flex: 1, padding: "14px 20px", border: "none", outline: "none",
                fontSize: 14, background: "white", fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                background: submitted ? "#4CAF50" : "#1a1a1a",
                color: "white", border: "none", cursor: "pointer",
                padding: "14px 24px", fontSize: 13, fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {submitted ? "✓ Subscribed!" : "Subscribe Now"}
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#E8F5E9", borderTop: "1px solid #d0e8d0", padding: "40px 5% 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 32,
          marginBottom: 40,
        }}>
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>{col.title}</h4>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 13, color: "#666", textDecoration: "none", marginBottom: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#1a1a1a"}
                  onMouseLeave={e => e.target.style.color = "#666"}
                >{l}</a>
              ))}
            </div>
          ))}

          {/* Address */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>Terms & Policies</h4>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 8 }}>1498w Fluton ste, STE 2D Chicago, IL 63867.</p>
            <p style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>(123) 456789000</p>
            <p style={{ fontSize: 13, color: "#666" }}>info@elementum.com</p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #c5dcc5", paddingTop: 20, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "#888" }}>©2023 Elementum. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{overflow-x:hidden}
        @media(max-width:768px){
          section>div>div[style*="grid-template-columns: 1fr 1fr"]{
            grid-template-columns:1fr!important;
          }
          section>div>div[style*="grid-template-columns: auto 1fr auto"]{
            grid-template-columns:1fr!important;
          }
          section>div>div[style*="grid-template-columns: auto 1fr auto"]>div:first-child,
          section>div>div[style*="grid-template-columns: auto 1fr auto"]>div:last-child{
            display:none!important;
          }
        }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <TomorrowSection />
        <ProgressSection />
        <ServicesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
