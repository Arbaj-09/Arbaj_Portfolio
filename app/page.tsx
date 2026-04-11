"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = ["Home","About","Skills","Projects","Deployment","Experience","Contact"];

const SKILLS_DATA = [
  { cat:"Frontend", color:"#00c8ff", icon:"🎨", items:["Next.js","React.js","JavaScript","HTML5","CSS3","Tailwind CSS","Bootstrap"] },
  { cat:"Backend", color:"#7b61ff", icon:"⚙️", items:["Java","Spring Boot","Hibernate/JPA","REST APIs","WebSocket","Python (Basic)","FastAPI (Learning)"] },
  { cat:"Database", color:"#00ff88", icon:"🗄️", items:["MySQL","Database Design","Schema Optimization"] },
  { cat:"Tools & Platforms", color:"#ffa500", icon:"🛠️", items:["Git","GitHub","Postman","Firebase FCM","Firebase Realtime","Eclipse","VS Code"] },
  { cat:"Deployment & DevOps", color:"#ff6b6b", icon:"🚀", items:["Hostinger VPS","Linux Server","Nginx","SSL / HTTPS","Domain & DNS","Spring Boot Deploy","Next.js Deploy","CI/CD Basics"] },
  { cat:"Hardware Integration", color:"#ff9f43", icon:"🔌", items:["ZKTeco Biometric","Biometric Sync","Attendance Hardware"] },
];

const PROJECTS = [
  {
    id:1, title:"WorldTripLink", subtitle:"Cab Booking & Vendor Management Platform",
    role:"Full Stack Developer", url:"https://worldtriplink.com", color:"#00c8ff", emoji:"🚖", type:"Live Project",
    images:[
      { url:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", label:"Admin Dashboard" },
      { url:"https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80", label:"Cab Booking System" },
      { url:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", label:"Live Tracking" },
    ],
    tags:["Spring Boot","Next.js","MySQL","Firebase FCM","WebSocket","ZKTeco"],
    highlights:["Real-time live tracking","Firebase notifications","Driver assignment"],
    points:[
      "Built full admin dashboard — total bookings, revenue stats, live driver locations",
      "Implemented Firebase Cloud Messaging for instant booking notifications to drivers",
      "WebSocket-based live trip tracking with real-time driver location updates",
      "Vendor & driver management — registration, assignment, scheduling, history",
      "Payment management module — transactions, dues, reports, settlements",
      "Attendance system with ZKTeco biometric sync and payroll calculation",
      "Optimized MySQL schemas supporting high-volume concurrent bookings",
    ],
  },
  {
    id:2, title:"ManagifyHR", subtitle:"Enterprise HR Management System",
    role:"Backend Developer", url:"https://managifyhr.com", color:"#7b61ff", emoji:"👥", type:"Live Project",
    images:[
      { url:"https://managifyhr.com/images/HRM New dahbord.png", label:"HRM Dashboard" },
      { url:"https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", label:"Employee Management" },
      { url:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", label:"Payroll & Analytics" },
    ],
    tags:["Spring Boot","MySQL","Firebase FCM","WebSocket","ZKTeco","REST APIs"],
    highlights:["Payroll automation","Real-time alerts","Biometric sync"],
    points:[
      "Designed RESTful APIs for employee lifecycle — onboarding, attendance, payroll",
      "Firebase Cloud Messaging for real-time HR alerts — leaves, approvals, announcements",
      "ZKTeco biometric integration — auto-sync punch data with MySQL attendance records",
      "WebSocket live monitoring — HR admins see attendance status and activities in real time",
      "Automated payroll calculation with deductions, overtime, and salary slip generation",
      "Leave management system — application, approval workflow, balance tracking",
      "Staff performance dashboard and custom reporting modules",
    ],
  },
  {
    id:3, title:"RouteBudget", subtitle:"Fleet Expense Management Platform",
    role:"Full Stack Developer", url:"https://routebudget.com", color:"#00ff88", emoji:"🗺️", type:"Live Project",
    images:[
      { url:"https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?w=800&q=80", label:"Route Dashboard" },
      { url:"https://images.klipfolio.com/website/public/43d1163c-613a-4709-b29f-c9e48a2dd27e/supply-chain-dashboard-example.png", label:"Fleet Analytics" },
      { url:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", label:"Admin Panel" },
    ],
    tags:["Spring Boot","Next.js","MySQL","REST APIs","Tailwind CSS","ERP System"],
    highlights:["ERP multi-admin","Expense tracking","Cloud sync"],
    points:[
      "Built ERP-based multi-admin system — Master Admin + Sub-Admin with access control",
      "Fleet expense tracking — fuel, toll, FastTag, maintenance with image upload",
      "Developed public-facing website with responsive UI using Next.js & Tailwind CSS",
      "Visual analytics dashboard with expense graphs and vehicle-wise breakdowns",
      "Real-time cloud sync across mobile and desktop for on-the-go access",
      "REST APIs for seamless mobile app ↔ admin panel communication",
      "Alert system — low fuel warnings, over-budget alerts, insurance reminders",
    ],
  },
  {
    id:4, title:"Yashraj Enterprises", subtitle:"Admin Panel & Staff Management",
    role:"Backend Developer", url:"https://admin.yashrajent.com/login", color:"#ffa500", emoji:"🏢", type:"Live Project",
    images:[
      { url:"https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80", label:"Staff Admin Panel" },
      { url:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", label:"Workflow Management" },
      { url:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80", label:"Real-time Notifications" },
    ],
    tags:["Spring Boot","Firebase","MySQL","WebSocket","ZKTeco","REST APIs"],
    highlights:["Real-time notifications","Staff workflows","Live monitoring"],
    points:[
      "Built Zoho-like admin web app for complete staff and operations management",
      "Firebase Cloud Messaging real-time notification system for all staff events",
      "ZKTeco biometric attendance sync — automatic punch-in/out to MySQL",
      "Staff leave, shift, and task assignment management modules",
      "WebSocket live activity monitoring for admins — staff status in real time",
      "Payroll engine with attendance-based calculation and report export",
      "Role-based access control for different admin levels",
    ],
  },
];

const DEPLOYMENT_SKILLS = [
  { icon:"🖥️", title:"Hostinger VPS", desc:"Deployed production apps on Hostinger Linux VPS servers" },
  { icon:"🐧", title:"Linux Server", desc:"Ubuntu/Linux server setup, user management, and configuration" },
  { icon:"🌐", title:"Nginx Config", desc:"Nginx reverse proxy setup for Spring Boot & Next.js apps" },
  { icon:"🔒", title:"SSL / HTTPS", desc:"Let's Encrypt SSL certificates installation and renewal" },
  { icon:"🌍", title:"Domain & DNS", desc:"Domain pointing, DNS management, A records, subdomains" },
  { icon:"☕", title:"Spring Boot Deploy", desc:"JAR deployment with systemd service and PM2 process management" },
  { icon:"⚡", title:"Next.js Deploy", desc:"Next.js production build, standalone mode, PM2 cluster" },
  { icon:"🗄️", title:"MySQL on VPS", desc:"MySQL server install, user creation, remote access security" },
];

function useTypewriter(strings: string[], speed = 70, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx % strings.length];
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting, idx, strings, speed, pause]);
  return displayed;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(2,12,27,0.96)":"transparent", backdropFilter:scrolled?"blur(16px)":"none", borderBottom:scrolled?"1px solid rgba(0,200,255,0.1)":"none", transition:"all 0.3s" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:18, color:"var(--accent)", cursor:"pointer" }} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
          AS<span style={{ color:"var(--text)" }}>.</span>dev
        </span>
        <div className="hidden md:flex" style={{ gap:32, alignItems:"center" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={l==="Home"?"#top":`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"var(--muted)", transition:"color 0.2s", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--accent)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}>{l}</a>
          ))}
          <a href="/resume.pdf" download style={{ padding:"8px 18px", borderRadius:8, background:"rgba(0,200,255,0.1)", border:"1px solid rgba(0,200,255,0.35)", color:"var(--accent)", fontFamily:"'Space Mono',monospace", fontSize:12, textDecoration:"none" }}>
            Resume ↓
          </a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background:"none", border:"none", color:"var(--accent)", fontSize:22, cursor:"pointer" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ background:"rgba(2,12,27,0.98)", borderBottom:"1px solid rgba(0,200,255,0.1)", padding:"16px 24px 24px" }}>
          {NAV_LINKS.map(l => (
            <a key={l} href={l==="Home"?"#top":`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ display:"block", padding:"12px 0", fontFamily:"'Space Mono',monospace", fontSize:13, color:"var(--muted)", textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>{l}</a>
          ))}
          <a href="/resume.pdf" download style={{ display:"block", padding:"12px 0", fontFamily:"'Space Mono',monospace", fontSize:13, color:"var(--accent)", textDecoration:"none" }}>
            Download Resume ↓
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const title = useTypewriter(["Java Full Stack Developer","Spring Boot Expert","REST API Architect","Real-time Systems Builder"]);
  return (
    <section id="top" className="grid-bg" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:80, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,200,255,0.05) 0%,transparent 70%)", top:"-10%", left:"-15%", pointerEvents:"none" }} className="float" />
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(123,97,255,0.05) 0%,transparent 70%)", bottom:"-5%", right:"-10%", pointerEvents:"none", animation:"float 6s ease-in-out infinite reverse" }} />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"80px 24px", display:"grid", gridTemplateColumns:"1fr auto", gap:60, alignItems:"center", width:"100%" }} className="flex-col-mobile">
        <div style={{ animation:"fadeUp 0.8s ease forwards" }}>
          <div className="badge" style={{ background:"rgba(0,255,136,0.08)", border:"1px solid rgba(0,255,136,0.25)", color:"var(--accent3)", marginBottom:24 }}>
            <span className="glow-dot" />
            Open to Full-time &amp; Freelance Opportunities
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(2.4rem,5.5vw,4.2rem)", lineHeight:1.1, color:"var(--text)", marginBottom:12 }}>
            Hi, I&apos;m <span className="gradient-text">Arbaj Shaikh</span>
          </h1>
          <p className="cursor" style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(1rem,2vw,1.2rem)", color:"var(--accent)", minHeight:36, marginBottom:20 }}>{title}</p>
          <p style={{ color:"var(--muted2)", fontSize:16, lineHeight:1.8, maxWidth:540, marginBottom:36 }}>
            Building <strong style={{ color:"var(--text)" }}>scalable enterprise applications</strong> with real-time systems — from admin dashboards and booking platforms to HRM systems and VPS production deployments.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }}>
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="/resume.pdf" download className="btn-green">⬇ Download Resume</a>
            <a href="#contact" className="btn-outline">Contact Me</a>
          </div>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            {[
              { label:"LinkedIn", href:"https://linkedin.com/in/arbaj-shaikh-91a248227", color:"#0077b5" },
              { label:"GitHub", href:"https://github.com/arbajshaikh", color:"var(--muted2)" },
              { label:"+91 95611 64142", href:"tel:+919561164142", color:"var(--accent3)" },
              { label:"Pune, India 🇮🇳", href:"#", color:"var(--muted)" },
            ].map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
                style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:s.color, textDecoration:"none" }}
                onMouseEnter={e=>(e.currentTarget.style.opacity="0.7")}
                onMouseLeave={e=>(e.currentTarget.style.opacity="1")}>{s.label}</a>
            ))}
          </div>
        </div>

        {/* Profile card */}
        <div style={{ display:"flex", justifyContent:"center", animation:"fadeUp 0.8s 0.2s ease both" }}>
          <div className="animated-border" style={{ borderRadius:24, padding:32, width:300, background:"var(--surface)", boxShadow:"0 0 80px rgba(0,200,255,0.06)", flexShrink:0 }}>
            {/* PHOTO — put your photo.jpg in /public/ folder */}
            <div style={{ width:120, height:120, borderRadius:16, margin:"0 auto 20px", border:"2px solid rgba(0,200,255,0.35)", overflow:"hidden", boxShadow:"0 0 30px rgba(0,200,255,0.2)" }} className="float">
              <img src="/photo.jpg" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }} alt="Arbaj Shaikh"
                onError={e => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.display = "flex";
                    parent.style.alignItems = "center";
                    parent.style.justifyContent = "center";
                    parent.style.fontSize = "52px";
                    parent.style.background = "linear-gradient(135deg,rgba(0,200,255,0.15),rgba(123,97,255,0.15))";
                    parent.textContent = "👨‍💻";
                  }
                }} />
            </div>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20, color:"var(--text)" }}>Arbaj Shaikh</p>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"var(--accent)", marginTop:4 }}>Full Stack Developer</p>
            </div>
            {[
              { k:"Experience", v:"1+ Year" },
              { k:"Live Projects", v:"4+" },
              { k:"Location", v:"Pune, India" },
              { k:"Degree", v:"BCA — 8.43 CGPA" },
              { k:"Deployment", v:"VPS Production" },
            ].map(item => (
              <div key={item.k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"var(--muted)" }}>{item.k}</span>
                <span style={{ fontSize:12, fontWeight:600, color:"var(--text)" }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const INFO = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00c8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, label:"Current Company", value:"Webutsav Pvt. Ltd.", color:"#00c8ff" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label:"Location", value:"Pune, Maharashtra", color:"#00ff88" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7b61ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, label:"Education", value:"BCA - 8.43 CGPA", color:"#7b61ff" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label:"Experience", value:"Jan 2025 - Present", color:"#00ff88" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, label:"Deployment", value:"Hostinger VPS", color:"#ff6b6b" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffa500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>, label:"Specialization", value:"Enterprise Dashboards", color:"#ffa500" },
  ];
  return (
    <section id="about" style={{ padding:"80px 16px", background:"var(--bg2)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">_01 / about me</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:40 }}>Who I Am</h2>
        <div className="about-grid">
          <div>
            <p style={{ color:"var(--muted2)", fontSize:16, lineHeight:1.9, marginBottom:20 }}>
              I&apos;m a <strong style={{ color:"var(--accent)" }}>Java Full Stack Developer</strong> at Webutsav Pvt. Ltd., Pune with hands-on experience building enterprise-grade web applications. I specialize in backend architecture with <strong style={{ color:"var(--text)" }}>Spring Boot</strong> and modern frontends with <strong style={{ color:"var(--text)" }}>Next.js</strong>.
            </p>
            <p style={{ color:"var(--muted2)", fontSize:16, lineHeight:1.9, marginBottom:20 }}>
              What makes me different — I don&apos;t just write code. I <strong style={{ color:"var(--text)" }}>deploy it to production</strong>. I&apos;ve configured Hostinger VPS servers, set up Nginx, SSL, domain management, and maintained live systems serving real users.
            </p>
            <p style={{ color:"var(--muted2)", fontSize:16, lineHeight:1.9, marginBottom:32 }}>
              I&apos;ve worked across <strong style={{ color:"var(--accent3)" }}>cab booking platforms</strong>, <strong style={{ color:"var(--accent3)" }}>HR management systems</strong>, <strong style={{ color:"var(--accent3)" }}>fleet management tools</strong>, and <strong style={{ color:"var(--accent3)" }}>staff management panels</strong> — all live, production-deployed applications.
            </p>
            <div style={{ padding:20, borderRadius:12, background:"rgba(0,200,255,0.04)", border:"1px solid rgba(0,200,255,0.12)" }}>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"var(--accent)", fontStyle:"italic", lineHeight:1.7 }}>
                &quot;From Development to Production Deployment — I Deliver Complete Scalable Solutions.&quot;
              </p>
            </div>
          </div>
          <div className="about-cards-grid">
            {INFO.map(item => (
              <div key={item.label} className="card" style={{ padding:20, borderRadius:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:`${item.color}15`, border:`1px solid ${item.color}30`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12 }}>
                  {item.icon}
                </div>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"var(--muted)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>{item.label}</p>
                <p style={{ fontSize:13, fontWeight:700, color:"var(--text)", lineHeight:1.4 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="grid-bg" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">_02 / technical skills</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:12 }}>My Tech Stack</h2>
        <p style={{ color:"var(--muted)", marginBottom:48, fontSize:15 }}>Everything from writing APIs to deploying them in production</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, marginBottom:48 }}>
          {SKILLS_DATA.map(s => (
            <div key={s.cat} className="card" style={{ padding:24, borderRadius:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <span style={{ fontSize:22 }}>{s.icon}</span>
                <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:s.color, fontWeight:700, letterSpacing:"0.05em" }}>{s.cat}</p>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {s.items.map(item => (
                  <span key={item} className="skill-pill" style={{ color:s.color, borderColor:`${s.color}25`, background:`${s.color}08` }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:16 }}>
          {[
            { n:"1+", l:"Years Exp" },
            { n:"4+", l:"Live Projects" },
            { n:"3", l:"Apps Deployed" },
            { n:"10+", l:"REST APIs Built" },
            { n:"8.43", l:"BCA CGPA" },
          ].map(s => (
            <div key={s.l} className="card" style={{ padding:24, borderRadius:12, textAlign:"center" }}>
              <p className="gradient-text" style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"2rem" }}>{s.n}</p>
              <p style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"var(--muted)", marginTop:4 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageSlider({ images, color }: { images:{url:string;label:string}[]; color:string }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const next = useCallback(() => setCurrent(c => (c+1)%images.length), [images.length]);
  const prev = useCallback(() => setCurrent(c => (c-1+images.length)%images.length), [images.length]);
  useEffect(() => {
    timerRef.current = setInterval(next, 3500);
    return () => { if(timerRef.current) clearInterval(timerRef.current); };
  }, [next]);
  return (
    <div style={{ position:"relative", borderRadius:"12px 12px 0 0", overflow:"hidden", height:220, background:"var(--bg)" }}>
      {images.map((img, i) => (
        <div key={i} style={{ position:"absolute", inset:0, transition:"opacity 0.5s ease", opacity:i===current?1:0 }}>
          <img src={img.url} alt={img.label} style={{ width:"100%", height:"100%", objectFit:"cover" }}
            onError={e => { (e.target as HTMLImageElement).src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"; }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(2,12,27,0.8) 0%,transparent 60%)" }} />
          <span style={{ position:"absolute", bottom:12, left:12, fontFamily:"'Space Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.8)", background:"rgba(0,0,0,0.5)", padding:"2px 8px", borderRadius:4 }}>{img.label}</span>
        </div>
      ))}
      <button onClick={e=>{e.stopPropagation();prev();}} style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", background:"rgba(2,12,27,0.7)", border:`1px solid ${color}40`, color, width:28, height:28, borderRadius:"50%", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}>‹</button>
      <button onClick={e=>{e.stopPropagation();next();}} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"rgba(2,12,27,0.7)", border:`1px solid ${color}40`, color, width:28, height:28, borderRadius:"50%", cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", zIndex:5 }}>›</button>
      <div style={{ position:"absolute", bottom:8, right:12, display:"flex", gap:4, zIndex:5 }}>
        {images.map((_,i) => (
          <div key={i} onClick={e=>{e.stopPropagation();setCurrent(i);}} className={`slider-dot${i===current?" active":""}`} style={{ background:i===current?color:"rgba(255,255,255,0.4)", width:i===current?22:7, cursor:"pointer" }} />
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState<number|null>(null);
  return (
    <section id="projects" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">_03 / featured projects</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:12 }}>Live Projects</h2>
        <p style={{ color:"var(--muted)", marginBottom:48, fontSize:15 }}>Click any card to see full project details</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:24 }}>
          {PROJECTS.map(p => (
            <div key={p.id} className="card" onClick={() => setActive(active===p.id?null:p.id)}
              style={{ borderRadius:16, overflow:"hidden", cursor:"pointer", borderColor:active===p.id?`${p.color}50`:undefined, boxShadow:active===p.id?`0 0 40px ${p.color}15`:undefined }}>
              <ImageSlider images={p.images} color={p.color} />
              <div style={{ padding:24 }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                  <div>
                    <div style={{ display:"flex", gap:8, marginBottom:8, alignItems:"center" }}>
                      <span style={{ fontSize:20 }}>{p.emoji}</span>
                      <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, padding:"2px 8px", borderRadius:4, background:`${p.color}15`, border:`1px solid ${p.color}30`, color:p.color }}>{p.type}</span>
                    </div>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:18, color:"var(--text)", marginBottom:2 }}>{p.title}</h3>
                    <p style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{p.subtitle}</p>
                    <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:p.color }}>{p.role}</p>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", flexShrink:0 }}>
                    {p.url !== "#" && (
                      <a href={p.url} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
                        style={{ padding:"5px 12px", borderRadius:6, background:`${p.color}15`, border:`1px solid ${p.color}40`, color:p.color, fontFamily:"'Space Mono',monospace", fontSize:10, textDecoration:"none" }}>
                        Live ↗
                      </a>
                    )}
                    <span style={{ color:"var(--muted)", fontSize:16 }}>{active===p.id?"−":"+"}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
                  {p.highlights.map(h => (
                    <span key={h} style={{ padding:"3px 8px", borderRadius:4, background:`${p.color}08`, border:`1px solid ${p.color}20`, color:p.color, fontFamily:"'Space Mono',monospace", fontSize:10 }}>{h}</span>
                  ))}
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding:"3px 8px", borderRadius:4, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"var(--muted)", fontSize:10, fontFamily:"'Space Mono',monospace" }}>{t}</span>
                  ))}
                </div>
                {active===p.id && (
                  <div style={{ marginTop:20, paddingTop:20, borderTop:`1px solid ${p.color}20` }}>
                    <p style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:p.color, marginBottom:12 }}>// Key Contributions</p>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                      {p.points.map((pt,i) => (
                        <li key={i} style={{ display:"flex", gap:10, fontSize:13, color:"var(--muted2)", lineHeight:1.65 }}>
                          <span style={{ color:p.color, flexShrink:0 }}>▸</span>{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deployment() {
  return (
    <section id="deployment" className="dot-bg" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">_04 / deployment & devops</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:12 }}>Production Deployment</h2>
        <p style={{ color:"var(--muted)", fontSize:15, marginBottom:12, maxWidth:600, lineHeight:1.8 }}>
          I don&apos;t just build apps — I deploy them to production VPS servers. End-to-end ownership from code to live URL.
        </p>
        <div style={{ padding:20, borderRadius:12, background:"rgba(255,107,107,0.05)", border:"1px solid rgba(255,107,107,0.2)", marginBottom:48, display:"inline-block" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#ff6b6b", fontStyle:"italic" }}>
            &quot;End-to-end full stack development including production deployment on VPS infrastructure.&quot;
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16, marginBottom:48 }}>
          {DEPLOYMENT_SKILLS.map(d => (
            <div key={d.title} className="card" style={{ padding:20, borderRadius:12 }}>
              <span style={{ fontSize:28, display:"block", marginBottom:10 }}>{d.icon}</span>
              <p style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:15, color:"var(--text)", marginBottom:6 }}>{d.title}</p>
              <p style={{ fontSize:13, color:"var(--muted)", lineHeight:1.6 }}>{d.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ padding:32, borderRadius:16, background:"var(--surface)", border:"1px solid var(--border)" }}>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"var(--accent)", marginBottom:20 }}>// Typical Deployment Pipeline</p>
          <div style={{ display:"flex", gap:0, flexWrap:"wrap", alignItems:"center" }}>
            {[
              { step:"Code", icon:"💻" },
              { step:"GitHub Push", icon:"⬆" },
              { step:"SSH to VPS", icon:"🔐" },
              { step:"Build & JAR", icon:"☕" },
              { step:"Nginx Config", icon:"🌐" },
              { step:"SSL Setup", icon:"🔒" },
              { step:"Go Live", icon:"🚀" },
            ].map((s, i, arr) => (
              <div key={s.step} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ textAlign:"center", padding:"10px 16px", borderRadius:8, background:"rgba(0,200,255,0.06)", border:"1px solid rgba(0,200,255,0.15)" }}>
                  <span style={{ fontSize:20, display:"block" }}>{s.icon}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"var(--muted2)" }}>{s.step}</span>
                </div>
                {i < arr.length-1 && <span style={{ color:"var(--accent)", fontSize:18, margin:"0 4px" }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding:"100px 24px", background:"var(--bg2)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <p className="section-label">_05 / work experience</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:48 }}>Experience &amp; Education</h2>
        <div style={{ position:"relative", paddingLeft:32, borderLeft:"1px solid rgba(0,200,255,0.15)", marginBottom:64 }}>
          <div className="timeline-dot" />
          <div style={{ marginBottom:12 }}>
            <span className="badge" style={{ background:"rgba(0,255,136,0.1)", border:"1px solid rgba(0,255,136,0.25)", color:"var(--accent3)", fontSize:11 }}>Jan 2025 — Present</span>
          </div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:24, color:"var(--text)", marginBottom:4 }}>Java Full Stack Developer</h3>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"var(--accent)", marginBottom:24 }}>Webutsav Pvt. Ltd., Pune</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12 }}>
            {[
              "Developed REST APIs using Spring Boot & Hibernate for production web applications",
              "Designed optimized MySQL schemas for booking & HR platforms",
              "Built admin dashboards using Next.js & Tailwind CSS",
              "Implemented attendance tracking & payroll calculation modules",
              "Integrated ZKTeco biometric attendance sync with MySQL",
              "Firebase real-time notifications for HR alerts & system events",
              "Deployed production apps on Hostinger VPS with Nginx + SSL",
              "WebSocket implementation for real-time live tracking and monitoring",
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:12, padding:16, borderRadius:10, background:"var(--surface)", border:"1px solid var(--border)" }}>
                <span style={{ color:"var(--accent)", flexShrink:0 }}>✦</span>
                <p style={{ fontSize:13, color:"var(--muted2)", lineHeight:1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"relative", paddingLeft:32, borderLeft:"1px solid rgba(123,97,255,0.15)" }}>
          <div style={{ width:12, height:12, borderRadius:"50%", background:"var(--accent2)", boxShadow:"0 0 0 4px rgba(123,97,255,0.15)", position:"absolute", left:-6, top:0 }} />
          <div style={{ marginBottom:12 }}>
            <span className="badge" style={{ background:"rgba(123,97,255,0.1)", border:"1px solid rgba(123,97,255,0.25)", color:"var(--accent2)", fontSize:11 }}>Aug 2021 — Apr 2024</span>
          </div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:24, color:"var(--text)", marginBottom:4 }}>Bachelor of Computer Applications (BCA)</h3>
          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"var(--accent2)", marginBottom:16 }}>S. M. Joshi College, Hadapsar, Pune</p>
          <span className="badge" style={{ background:"rgba(0,255,136,0.08)", border:"1px solid rgba(0,255,136,0.2)", color:"var(--accent3)", fontSize:12 }}>CGPA: 8.43 / 10</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="grid-bg" style={{ padding:"100px 24px" }}>
      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center" }}>
        <p className="section-label">_06 / let&apos;s connect</p>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"var(--text)", marginBottom:16 }}>Ready to Work Together?</h2>
        <p style={{ color:"var(--muted2)", fontSize:16, lineHeight:1.8, marginBottom:48 }}>
          Open to full-time roles, freelance projects, and collaborations. Let&apos;s build something scalable.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:40 }}>
          <a href="mailto:arbajshaikh9561@gmail.com" className="btn-primary">✉ arbajshaikh9561@gmail.com</a>
          <a href="https://wa.me/919561164142?text=Hi%20Arbaj%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!" target="_blank" rel="noreferrer" className="whatsapp-btn">💬 WhatsApp</a>
          <a href="/resume.pdf" download className="btn-green">⬇ Resume PDF</a>
        </div>
        <div style={{ display:"flex", gap:32, justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { l:"LinkedIn", h:"https://linkedin.com/in/arbaj-shaikh-91a248227" },
            { l:"GitHub", h:"https://github.com/arbajshaikh" },
            { l:"+91 95611 64142", h:"tel:+919561164142" },
            { l:"Pune, India", h:"#" },
          ].map(s => (
            <a key={s.l} href={s.h} target={s.h.startsWith("http")?"_blank":undefined} rel="noreferrer"
              style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"var(--muted)", textDecoration:"none" }}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--accent)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}>{s.l}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding:"32px 24px", borderTop:"1px solid var(--border)", textAlign:"center", background:"var(--bg)" }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"var(--muted)" }}>
        Designed &amp; built by <span style={{ color:"var(--accent)" }}>Arbaj Shaikh</span> · {new Date().getFullYear()} · Pune, India
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Deployment />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
