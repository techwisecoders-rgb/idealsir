 "use client";
import { useEffect, useMemo, useState } from "react";
import {
  School, GraduationCap, Rocket, BookOpen, IndianRupee, Laptop, Smartphone,
  ChartNoAxesCombined, ShieldCheck, BriefcaseBusiness, Handshake, Phone, MessageCircle,
  Zap, House, Megaphone, Globe, Mail, Award, Trophy, BadgeCheck, ArrowLeft,
  Heart, MessageSquare, Send, Repeat2, Bookmark, Search, ChevronLeft, ChevronRight,
  LockKeyhole, ReceiptText, Download, CircleHelp, Eye, EyeOff, X, ExternalLink
} from "lucide-react";

type Page = "home" | "services" | "social" | "collab" | "payments";
const services = [
"SOFTWARE SERVICES","WEBSITE DEVELOPMENT","FRONTEND - BACKEND","APP DEVELOPMENT","BUILD START-UPS","CUSTOM PLATFORMS","INCUBATION SUPPORT","BUSINESSES DEVELOPMENT","E-COMMERCE DEVELOPMENT","DOMAIN, DEPLOYMENT & WEB HOSTING","TECHNICAL TEAM, ASSISTANCE TEAM","CODE PROGRAMMING","FREELANCING","ARTIFICIAL INTELLIGENCE","MACHINE LEARNING / DEEP LEARNING (ML / DL)","AI INTEGRATIONS & AUTOMATION SOLUTIONS","API DEVELOPMENT & INTEGRATION","DATA SCIENCE","CYBER SECURITY","BUILD PORTFOLIO, PROJECTS, CV, RESUME","CLOUD COMPUTING, CLOUD SOLUTIONS","COMPUTER NETWORKS","GRAPHIC DESIGN","UI/UX DESIGN","PLUGINS DEVELOPMENT","SERVER CONFIGURATION & MANAGEMENT","PROTOTYPE DEVELOPMENT","DATABASE MANAGEMENT","DEVOPS & CI/CD SOLUTIONS","EVENT MANAGEMENT","DIGITAL MARKETING & BRANDING","SOCIAL MEDIA MANAGEMENT","CONTENT CREATION","INFLUENCER MARKETING","CUSTOMER RELATIONSHIP MANAGEMENT (CRM)","ENTERPRISE RESOURCE PLANNING","ADMINISTRATIVE DASHBOARDS","WORKFLOWS, SALES & OPERATIONS MANAGEMENT"
];
const cards = [
 {title:"WORLD OF EDUCATION",image:"https://cdn.corenexis.com/f/ZBOjpooG2zC.jpg",items:["From the first step of learning to the highest level of education","KG to PG: one complete ecosystem","Offline and online educational resources","Students · Teachers · Institutes","Educational queries: 9963935878"]},
 {title:"EDUCATIONAL TRUST",image:"https://cdn.corenexis.com/f/eJQQU5hevEg.png",items:["I love children","Every child is my child","Support for orphanage students, children with disabilities and students in need","Equal opportunities for everyone","Educational queries: 9963935878"]},
 {title:"HiDL SCHOLARSHIP CARD",image:"https://cdn.corenexis.com/f/xOp4cDwaCXF.png",items:["Educational support","Financial support for qualified merit students","Exam-based eligibility","Lifelong support for children","Special benefits and academic fee support"]},
 {title:"HARSHA SIR STARTS",image:"https://cdn.corenexis.com/f/0CmbFAkuLBI.jpeg",items:["We will help pursue your dreams, aims and goals","Build a future around your skills and talents","Turn a clear vision into reality","Give innovative ideas a life","Educational queries: 9963935878"]},
 {title:"HAI SUPERHERO",image:"https://cdn.corenexis.com/f/aHP60NmEpNX.png",items:["AI-powered digital assistance","Technology and software solutions","Innovation and entrepreneurship support","A digital superhero ecosystem"]}
];
const transactions = [
 {name:"SVU DEVELOPERS PVT LTD",type:"Received from",date:"18 Oct 2026",amount:"+ ₹2,000",direction:"Credited to",credit:true},
 {name:"CSC DigiSign",type:"Paid to",date:"03 Oct 2026",amount:"- ₹2,000",direction:"Debited from",credit:false},
 {name:"HOSTINGER",type:"Paid to",date:"02 Sept 2026",amount:"- ₹6,751.49",direction:"Debited from",credit:false}
];
const posts = [
 {id:1,avatar:"HAI",text:"🚀 Welcome to our official social network feed!",media:"",kind:"text"},
 {id:2,avatar:"HS",text:"",media:"https://cdn.corenexis.com/f/OXiik4O5ddD.png",kind:"image"},
 {id:3,avatar:"AI",text:"A little inspiration for your day.",media:"https://www.w3schools.com/html/mov_bbb.mp4",kind:"video"},
 {id:4,avatar:"P",text:"Listen to a sample audio post.",media:"https://www.w3schools.com/html/horse.mp3",kind:"audio"}
];
const homeGroups = [
 [{label:"SCHOOL",icon:"fa-solid fa-school",url:"https://www.universalinstitution.com"},{label:"CHILDREN",icon:"fa-solid fa-chalkboard-user",url:"https://www.sirchildren.com"},{label:"Start-Ups",icon:"fa-solid fa-rocket",url:"https://www.universalstartups.com"},{label:"Scholarships",icon:"fa-solid fa-graduation-cap"},{label:"COURSES",icon:"fa-solid fa-book"},{label:"Payments",icon:"fa-solid fa-indian-rupee-sign",pay:true}],
 [{label:"Websites",icon:"fa-solid fa-laptop-code"},{label:"Apps",icon:"fa-solid fa-mobile-screen-button"},{label:"Marketing",icon:"fa-solid fa-chart-line"},{label:"TRUST",icon:"fa-solid fa-shield-halved"},{label:"Join Team",icon:"fa-solid fa-briefcase"},{label:"Collab",icon:"fa-solid fa-handshake",collab:true}]
];

export default function Portal() {
 useEffect(() => {
  if (!("serviceWorker" in navigator)) return;
  const registerServiceWorker = () => {
   navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.warn("Service worker registration skipped:", error);
   });
  };
  if (document.readyState === "complete") registerServiceWorker();
  else window.addEventListener("load", registerServiceWorker, { once: true });
  return () => window.removeEventListener("load", registerServiceWorker);
 }, []);
 const [page,setPage]=useState<Page>("home");
 const [grid,setGrid]=useState(0);
 const [carousel,setCarousel]=useState(false);
 const [slide,setSlide]=useState(0);
 const [flipped,setFlipped]=useState(false);
 const [serviceSearch,setServiceSearch]=useState("");
 const [txSearch,setTxSearch]=useState("");
 const [modal,setModal]=useState<"password"|"details"|"statement"|null>(null);
 const [password,setPassword]=useState("");
 const [passwordError,setPasswordError]=useState("");
 const [selectedTx,setSelectedTx]=useState<(typeof transactions)[number]|null>(null);
 const [revealed,setRevealed]=useState(false);
 const [revealAll,setRevealAll]=useState(false);
 const [range,setRange]=useState("Last 30 days");
 const [fy,setFy]=useState(false);
 const [fileType,setFileType]=useState("PDF");
 const [liked,setLiked]=useState<number[]>([]);
 const [bookmarked,setBookmarked]=useState<number[]>([]);
 const [reposted,setReposted]=useState<number[]>([]);
 const [following,setFollowing]=useState(false);
 const [notice,setNotice]=useState("");
 const filteredServices=useMemo(()=>services.filter(s=>s.toLowerCase().includes(serviceSearch.toLowerCase())),[serviceSearch]);
 const filteredTx=useMemo(()=>transactions.filter(t=>(t.name+" "+t.type+" "+t.date).toLowerCase().includes(txSearch.toLowerCase())),[txSearch]);
 const openPage=(p:Page)=>{setPage(p);setCarousel(false);setNotice("");};
 const askPassword=(tx:(typeof transactions)[number]|null,all=false)=>{setSelectedTx(tx);setRevealAll(all);setPassword("");setPasswordError("");setModal("password");};
 const unlock=(e:React.FormEvent)=>{e.preventDefault();setPasswordError("Payment details are protected in this demo. Configure authentication on a secure server before using real financial records.");};
 const pageTitle=page==="services"?"Services":page==="social"?"Social Feed":page==="collab"?"Collaborations":"Our StartUp Payments";
 const homeIconGroups=homeGroups[grid];
 const ToggleLike=({id}:{id:number})=>{const active=liked.includes(id);return <button className={`action-btn ${active?"liked":""}`} onClick={()=>setLiked(old=>active?old.filter(x=>x!==id):[...old,id])}><Heart size={18} fill={active?"currentColor":"none"}/><span>{active?1_000_001:1_000_000}</span></button>;};
 return <div className="app-shell">
  <header className="top-banner" aria-label="Chakra Universe and HAI SuperHero banner"/>
  {page==="home"&&<main className="main-stage"><div className="home-stage">
    <button className="lightning-btn" aria-label="Open highlights" onClick={()=>{setCarousel(v=>!v);setFlipped(false);}}><Zap fill="#ffd700" color="#111"/></button>
    <div className={`matrix-grid ${carousel?"hidden":""}`}>
      {homeIconGroups.map((item)=>{return <button className="matrix-card" key={item.label} onClick={()=>{if("url" in item&&item.url)window.open(item.url,"_blank","noopener,noreferrer");else if("pay" in item&&item.pay)openPage("payments");else if("collab" in item&&item.collab)openPage("collab");else setNotice(`${item.label}: details will be added soon.`);}}><i className={`${item.icon} matrix-icon`} aria-hidden="true"/><span className="matrix-name">{item.label}</span></button>;})}
    </div>
    {!carousel&&<div className="grid-nav"><a className="corner-icon" href="tel:9963935878" aria-label="Call us"><i className="fa-solid fa-phone" aria-hidden="true"/></a><div className="grid-dots">{[0,1].map(n=><button key={n} aria-label={`Show grid ${n+1}`} className={`grid-dot ${grid===n?"active":""}`} onClick={()=>setGrid(n)}/>)}</div><a className="corner-icon" href="https://www.haisuperhero.com/chat" target="_blank" rel="noreferrer" aria-label="Open HAI chat"><i className="fa-solid fa-message" aria-hidden="true"/></a></div>}
    {carousel&&<div className="carousel-overlay"><div className="carousel-container"><div className="carousel-track" style={{transform:`translateX(-${slide*100}%)`}}>{cards.map(c=><div className="carousel-slide" key={c.title}><div className={`flip-card ${flipped?"flipped":""}`} onClick={()=>setFlipped(v=>!v)}><div className="flip-front"><img src={c.image} alt={c.title}/></div><div className="flip-back"><h2>{c.title}</h2><ul>{c.items.map(x=><li key={x}>⚡ {x}</li>)}</ul></div></div></div>)}</div><div className="carousel-controls"><button aria-label="Previous highlight" onClick={()=>{setSlide(s=>(s+cards.length-1)%cards.length);setFlipped(false);}}><ChevronLeft/></button><button aria-label="Next highlight" onClick={()=>{setSlide(s=>(s+1)%cards.length);setFlipped(false);}}><ChevronRight/></button></div><div className="carousel-dots">{cards.map((c,i)=><button aria-label={`Slide ${i+1}`} key={c.title} className={`slide-dot ${slide===i?"active":""}`} onClick={()=>{setSlide(i);setFlipped(false);}}/>)}</div></div></div>}
    {notice&&<div className="modal-backdrop" onClick={()=>setNotice("")}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="secondary-btn" style={{float:"right"}} onClick={()=>setNotice("")}><X size={16}/></button><h3>{notice}</h3><p className="muted">This navigation item is ready for its dedicated content.</p></div></div>}
  </div></main>}
  {page!=="home"&&<section className="page-layer"><div className="page-content">
    <div className="page-header"><h1 className="gradient-title">{pageTitle}</h1><button className="back-btn" onClick={()=>openPage("home")}><ArrowLeft size={16}/> Back</button></div>
    {page==="services"&&<><label className="search" style={{display:"flex",alignItems:"center",gap:10}}><Search size={18} color="#00f0ff"/><input aria-label="Search services" value={serviceSearch} onChange={e=>setServiceSearch(e.target.value)} placeholder="Search services..." style={{background:"transparent",border:0,outline:0,color:"white",width:"100%"}}/></label><div className="ribbon-list">{filteredServices.map(s=><button key={s} className="ribbon" onClick={()=>setNotice(`${s}: Contact HAI SuperHero to discuss this service.`)}>{s}</button>)}{!filteredServices.length&&<p className="empty-state">No services match your search.</p>}</div></>}
    {page==="social"&&<><div className="profile-card"><h2 style={{fontSize:"1rem"}}>HUMAN&apos;S ARTIFICIAL INTELLIGENCE <BadgeCheck size={16} color="#00f0ff" style={{display:"inline"}}/></h2><p className="muted">Founder: T. Harsha Adharsh Sir</p><div className="tag">About: All universal services at one chat</div><p className="description">We can help you with your work.</p><a className="link-pink" href="https://www.haisuperhero.com" target="_blank" rel="noreferrer"><Globe size={15} style={{display:"inline"}}/> www.haisuperhero.com</a><div className="contact-row"><a href="tel:9963935878"><Phone size={14} style={{display:"inline"}}/> 9963935878</a><a href="mailto:support@haisuperhero.com"><Mail size={14} style={{display:"inline"}}/> Email support</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer">▶ YouTube Channel</a></div><div className="highlights"><span className="pill"><Award size={14} style={{display:"inline"}}/> Govt Certified</span><span className="pill"><BadgeCheck size={14} style={{display:"inline"}}/> ISO 9001 Certified</span><span className="pill"><Trophy size={14} style={{display:"inline"}}/> Top Innovation 2026</span></div><div className="stats">{[["1M","Followers"],["100","Posts"],["1+","Employees"],["100","Projects"]].map(([v,l])=><div key={l}><span className="stat-value">{v}</span><span className="stat-label">{l}</span></div>)}</div></div><div className="feed">{posts.map(p=><article className="post" key={p.id}><div className="post-head"><div className="avatar">{p.avatar}</div><div><div className="post-author">HAI FOUNDER&apos;S TEAM <BadgeCheck size={14} color="#00f0ff" style={{display:"inline"}}/></div><span className="muted" style={{fontSize:".75rem"}}>5 SEPT 2026 • 12:00 AM</span></div><button className={`follow-btn ${following?"following":""}`} onClick={()=>setFollowing(v=>!v)}>{following?"Following":"+ Follow"}</button></div>{p.text&&<p>{p.text}</p>}{p.kind==="image"&&<img className="post-media" src={p.media} alt="Featured HAI post"/>}{p.kind==="video"&&<video className="post-media" controls><source src={p.media} type="video/mp4"/></video>}{p.kind==="audio"&&<audio controls style={{width:"100%"}}><source src={p.media} type="audio/mpeg"/></audio>}<div className="post-actions"><div className="action-group"><ToggleLike id={p.id}/><button className="action-btn" onClick={()=>setNotice("Comments are a demo interaction. Connect a backend to publish comments.")}><MessageSquare size={18}/><span>1M</span></button><button className="action-btn" onClick={()=>{if(navigator.share)navigator.share({title:"HAI SuperHero",url:location.href}).catch(()=>{});else navigator.clipboard?.writeText(location.href).then(()=>setNotice("Page link copied."));}}><Send size={18}/><span>Share</span></button><button className={`action-btn ${reposted.includes(p.id)?"reposted":""}`} onClick={()=>setReposted(old=>old.includes(p.id)?old.filter(x=>x!==p.id):[...old,p.id])}><Repeat2 size={18}/></button></div><button aria-label="Bookmark post" className={`action-btn ${bookmarked.includes(p.id)?"bookmarked":""}`} onClick={()=>setBookmarked(old=>old.includes(p.id)?old.filter(x=>x!==p.id):[...old,p.id])}><Bookmark size={18} fill={bookmarked.includes(p.id)?"currentColor":"none"}/></button></div></article>)}</div></>}
    {page==="collab"&&<div>{[["Partner with HAI","Join forces with Human’s Artificial Intelligence to build software, scalable startups, and innovative technology ecosystems."],["Enterprise & Academic Alliances","Collaborate with universities, research institutions, and enterprises on AI research, student skill programs, and joint development."],["Creator & Influencer Network","For technology creators, educators, and promoters who want to build and share useful digital solutions."]].map(([title,desc])=><article className="collab-card" key={title}><h3>{title}</h3><p className="description">{desc}</p><button className="primary-btn" onClick={()=>setNotice(`To continue with “${title}”, email support@haisuperhero.com or call 9963935878.`)}> {title==="Partner with HAI"?"Partner Up":title==="Enterprise & Academic Alliances"?"Join Alliance":"Collaborate Now"} </button></article>)}</div>}
    {page==="payments"&&<div className="transactions"><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}><h2>History</h2><button className="back-btn" onClick={()=>setModal("statement")}><Download size={15}/> Statements</button></div><input className="search" placeholder="Search payments" aria-label="Search payments" value={txSearch} onChange={e=>setTxSearch(e.target.value)}/><div className="tx-summary"><span>October 2026</span><strong>₹1,550.9 ›</strong></div>{filteredTx.map(t=><div className="tx-item" key={t.name}><div><div className="muted" style={{fontSize:".8rem"}}>{t.type}</div><button className="tx-name" onClick={()=>askPassword(t)}>{revealed?t.name:"▏▏▏▏▏▏▏▏▏"}</button><div className="muted" style={{fontSize:".78rem",marginTop:5}}>{t.date}</div></div><div style={{textAlign:"right"}}><div className={`amount ${t.credit?"credited":"debited"}`}>{t.amount}</div><div className="muted" style={{fontSize:".75rem",marginTop:6}}>{t.direction}</div></div></div>)}<button className="back-btn" style={{marginTop:20}} onClick={()=>askPassword(null,true)}><Eye size={16}/> Reveal all payment names</button><p className="muted" style={{fontSize:".8rem",lineHeight:1.5}}>Demo UI only. The payment entries shown here are sample content and are not connected to a bank or payment provider.</p></div>}
  </div></section>}
  <footer className="footer"><div className="footer-inner"><button aria-label="Services" title="Services" onClick={()=>openPage("services")}><i className="fa-brands fa-chrome" aria-hidden="true"/></button><button aria-label="Home" title="Home" onClick={()=>openPage("home")}><i className="fa-solid fa-house" aria-hidden="true"/></button><button aria-label="Social media" title="Social media" onClick={()=>openPage("social")}><i className="fa-solid fa-bullhorn" aria-hidden="true"/></button></div></footer>
  {modal==="password"&&<div className="modal-backdrop" onClick={()=>setModal(null)}><div className="modal-card" onClick={e=>e.stopPropagation()}><h2><LockKeyhole size={20} style={{display:"inline"}}/> Protected Payment Details</h2><p className="muted">Financial records should be protected by server-side authentication. This demo intentionally does not include a hard-coded password or reveal private details.</p><form onSubmit={unlock}><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (demo disabled)" autoComplete="current-password" required/><p style={{color:"#ff6b81",fontSize:".85rem"}}>{passwordError}</p><div className="modal-actions"><button type="submit" className="primary-btn">Unlock Details</button><button type="button" className="secondary-btn" onClick={()=>setModal(null)}>Cancel</button></div></form></div></div>}
  {modal==="statement"&&<div className="modal-backdrop" onClick={()=>setModal(null)}><div className="modal-card" onClick={e=>e.stopPropagation()}><h2><ReceiptText size={20} style={{display:"inline"}}/> Statement options</h2><p className="muted">Choose a sample statement period and file type.</p><div className="statement-options">{["Last 30 days","Last 90 days","Last 180 days","Last 365 days"].map(v=><button key={v} className={`option ${!fy&&range===v?"active":""}`} onClick={()=>{setFy(false);setRange(v)}}>{v}</button>)}</div><div className="statement-options">{["Current FY","FY 2025 - 2026"].map(v=><button key={v} className={`option ${fy&&range===v?"active":""}`} onClick={()=>{setFy(true);setRange(v)}}>{v}</button>)}</div><div className="statement-options">{["PDF","CSV"].map(v=><button key={v} className={`option ${fileType===v?"active":""}`} onClick={()=>setFileType(v)}>{v}</button>)}</div><p className="muted">No real bank statement is generated by this demo.</p><div className="modal-actions"><button className="primary-btn" onClick={()=>setNotice(`Statement export (${fileType}, ${range}) needs a real transaction data source.`)}>Download Statement</button><button className="secondary-btn" onClick={()=>setModal(null)}>Close</button></div></div></div>}
  {notice&&page!=="home"&&<div className="modal-backdrop" onClick={()=>setNotice("")}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="secondary-btn" style={{float:"right"}} onClick={()=>setNotice("")}><X size={16}/></button><h3>{notice}</h3><button className="primary-btn" style={{marginTop:16}} onClick={()=>setNotice("")}>OK</button></div></div>}
 </div>;
}
