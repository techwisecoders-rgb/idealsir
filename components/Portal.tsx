"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type ActivePage =
  | "home"
  | "company"
  | "services"
  | "collab"
  | "payments"
  | "projects";

interface CarouselSlideData {
  img: string;
  alt: string;
  title: string;
  items: { text: string; fontSize?: string }[];
}

interface TransactionItem {
  id: string;
  month: "October 2026" | "September 2026";
  type: "Received from" | "Paid to";
  name: string;
  date: string;
  amount: string;
  displayAmount: string;
  direction: "Credited to" | "Debited from";
  credited: boolean;
}

interface ProjectSlide {
  title: string;
  description: string;
  image: string;
  url: string;
}

const CAROUSEL_SLIDES: CarouselSlideData[] = [
  {
    img: "https://cdn.corenexis.com/f/tuSnGVcL.png",
    alt: "HEAWEN",
    title: "WORLD OF EDUCATION",
    items: [
      {
        text: 'FROM "THE FIRST STEP OF LEARNING"\nTO "THE HIGHEST LEVEL OF EDUCATION"',
        fontSize: "13px",
      },
      { text: "KG TO PG:\nONE COMPLETE ECOSYSTEM" },
      { text: "OFFLINE AND ONLINE\nALL EDUCATIONAL RESOURCES" },
      { text: "STUDENTS - TEACHERS - INSTITUTES" },
      { text: "EDUCATIONAL QUERIES:\n📞 9963935878" },
    ],
  },
  {
    img: "https://cdn.corenexis.com/f/vTxBUnUu.png",
    alt: "HEAWEN Educational World",
    title: "EDUCATIONAL TRUST",
    items: [
      { text: "I LOVE CHILDREN" },
      { text: "EVERY CHILD IS MY CHILD" },
      {
        text: "SPECIALLY ORPHANGE STUDENTS\nCHILDREN WITH DISABILITIES\nPOOR STUDENTS . . .",
      },
      { text: "EVERYONE WILL GET EQUAL OPPURTUNITES", fontSize: "12px" },
      { text: "NO TERMS AND CONDITIONS APPLIES", fontSize: "13px" },
      { text: "EDUCATIONAL QUERIES:\n📞 9963935878" },
    ],
  },
  {
    img: "https://cdn.corenexis.com/f/3TlvvksD.png",
    alt: "HIDL Card Scholarships",
    title: "HiDL SCHOLARSHIP CARD",
    items: [
      { text: "EDUCATIONAL SUPPORT" },
      { text: "FINANCIAL SUPPORT FOR\nQUALIFIED MERIT STUDENTS" },
      { text: "EXAM BASED ELIGIBILTY" },
      { text: "LIFELONG SUPPORT FOR CHILDREN" },
      { text: "SPECIAL BENIFITS" },
      { text: "CLAIM COMPLETE ACADEMICS FEE" },
      { text: "EDUCATIONAL QUERIES:\n📞 9963935878" },
    ],
  },
  {
    img: "https://cdn.corenexis.com/f/3zZsXuue.png",
    alt: "Education Universe",
    title: "HARSHA SIR STARTUPS",
    items: [
      {
        text: "WE WILL FULFILL\nYOUR DREAMS, YOUR AIMS,\nYOUR TARGETS, YOUR GOALS",
      },
      {
        text: "IF YOU DEFINED\nBY YOUR SKILLS AND TALENTS,\nTHEN WE WILL BUILD YOUR FUTURE",
      },
      { text: "IF YOU HAVE THE VISION,\nWE WILL TURN IT INTO REALITY" },
      { text: "IF YOU HAVE AN\nINNOVATIVE IDEAS,\nWE WILL TO GIVE IT A LIFE" },
      { text: "EDUCATIONAL QUERIES:\n📞 9963935878" },
    ],
  },
  {
    img: "https://cdn.corenexis.com/f/tG5unWaf.png",
    alt: "hAI Super Hero",
    title: "Service Overview 05",
    items: [
      { text: "AI-powered digital assistance" },
      { text: "Technology and software solutions" },
      { text: "Innovation and entrepreneurship support" },
      { text: "A complete digital superhero ecosystem" },
    ],
  },
];

const SERVICES_LIST: string[] = [
  "SOFTWARE SERVICES",
  "WEBSITE DEVELOPMENT",
  "FRONTEND - BACKEND",
  "APP DEVELOPMENT",
  "BUILD START-UPS",
  "CUSTOM PLATFORMS",
  "INCUBATION SUPPORT",
  "BUSINESSES DEVELOPMENT",
  "E-COMMERCE DEVELOPMENT",
  "DOMAIN, DEPLOYMENT & WEB HOSTING",
  "TECHNICAL TEAM, ASSISTANCE TEAM",
  "CODE PROGRAMMING",
  "FREELANCING",
  "ARTIFICIAL INTELLIGENCE",
  "MACHINE LEARNING / DEEP LEARNING (ML / DL)",
  "AI INTEGRATIONS & AUTOMATION SOLUTIONS",
  "API DEVELOPMENT & INTEGRATION",
  "DATA SCIENCE",
  "CYBER SECURITY",
  "BUILD PORTFOLIO, PROJECTS, CV, RESUME",
  "CLOUD COMPUTING, CLOUD SOLUTIONS",
  "COMPUTER NETWORKS",
  "GRAPHIC DESIGN",
  "UI/UX DESIGN",
  "PLUGINS DEVELOPMENT",
  "SERVER CONFIGURATION & MANAGEMENT",
  "PROTOTYPE DEVELOPMENT",
  "DATABASE MANAGEMENT",
  "DevOps & CI/CD Solutions",
  "EVENT MANAGEMENT",
  "DIGITAL MARKETING & BRANDING",
  "SOCIAL MEDIA MANAGEMENT",
  "CONTENT CREATION",
  "INFLUENCER MARKETING",
  "CUSTOMER RELATIONSHIP MANAGEMENT (CRM)",
  "ENTERPRISE RESOURCE PLANNING",
  "ADMINISTRATIVE DASHBOARDS",
  "WORKFLOWS, SALES & OPERATIONS MANAGEMENT",
];

const TRANSACTIONS: TransactionItem[] = [
  {
    id: "tx-1",
    month: "October 2026",
    type: "Received from",
    name: "SVU DEVELOPERS PVT LTD",
    date: "18 Oct 2026",
    amount: "+ ₹2,000",
    displayAmount: "+ ₹2,000",
    direction: "Credited to",
    credited: true,
  },
  {
    id: "tx-2",
    month: "October 2026",
    type: "Paid to",
    name: "CSC DigiSign",
    date: "03 Oct 2026",
    amount: "₹2,000",
    displayAmount: "- ₹2,000",
    direction: "Debited from",
    credited: false,
  },
  {
    id: "tx-3",
    month: "September 2026",
    type: "Paid to",
    name: "HOSTINGER",
    date: "02 Sept 2026",
    amount: "₹6,751.49",
    displayAmount: "- ₹6,751.49",
    direction: "Debited from",
    credited: false,
  },
];

const PROJECTS: ProjectSlide[] = [
  {
    title: "SVU DEVELOPERS PVT LTD COMPANY",
    description: "REAL ESTATE & LEGAL SERVICES",
    image:
      "https://img.freepik.com/premium-photo/real-estate-logo-template-with-golden-color-real-estate-icon-logo-design-template-vector-design_971166-12778.jpg",
    url: "https://www.svudevelopers.com/",
  },
  {
    title: "Aperture Studio",
    description: "Capturing Life's Most Precious Moments",
    image:
      "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=1000&q=80",
    url: "https://photographer-one-phi.vercel.app/",
  },
  {
    title: "John Doe Studios",
    description: "Photography",
    image:
      "https://res.cloudinary.com/dsresihyk/image/upload/v1777382750/studio_config/xa3le0nxzy1e778rwml7.webp",
    url: "https://photography-mauve.vercel.app/",
  },
  {
    title: "Cafe Miracle Restaurant",
    description: "Where Every Bite Feels Like A Miracle",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80&auto=format&fit=crop",
    url: "https://cafe-miracle-sigma.vercel.app/",
  },
];

const RAINBOW_COLORS = [
  "#FF0000",
  "#FF007F",
  "#FF8800",
  "#FFD700",
  "#FFFF00",
  "#00FF66",
  "#00E5FF",
];

function Rainbow3DText({ text }: { text: string }) {
  let colorIndex = 0;
  return (
    <span className="btn-text-3d">
      {Array.from(text).map((char, idx) => {
        if (char === " ") {
          return <span key={idx} className="space" />;
        }
        const color = RAINBOW_COLORS[colorIndex % RAINBOW_COLORS.length];
        colorIndex++;
        return (
          <span key={idx} className="char" style={{ color }}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

function MultilineText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export default function Portal() {
  const [activePage, setActivePage] = useState<ActivePage>("home");
  const [activeGrid, setActiveGrid] = useState<1 | 2>(1);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedSlides, setFlippedSlides] = useState<Record<number, boolean>>({});

  // Services search
  const [servicesSearch, setServicesSearch] = useState("");

  // Payment history & statement modal
  const [statementOpen, setStatementOpen] = useState(false);
  const [statementTab, setStatementTab] = useState<"range" | "fy">("range");
  const [selectedRange, setSelectedRange] = useState("Last 30 days");
  const [selectedFy, setSelectedFy] = useState("Current FY");
  const [selectedFileType, setSelectedFileType] = useState("PDF");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [allNamesRevealed, setAllNamesRevealed] = useState(false);

  // Password unlock modal
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [revealAllRequested, setRevealAllRequested] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<TransactionItem | null>(
    null
  );
  const [unlockedDetails, setUnlockedDetails] = useState<TransactionItem | null>(
    null
  );

  // Projects carousel
  const [currentProject, setCurrentProject] = useState(0);

  // Toast
  const [toastMessage, setToastMessage] = useState("OPENING SOCIAL MEDIA WEBSITE");
  const [toastActive, setToastActive] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const paymentPageRef = useRef<HTMLElement | null>(null);

  const totalSlides = CAROUSEL_SLIDES.length;

  const showToast = (msg: string, duration = 2200) => {
    setToastMessage(msg);
    setToastActive(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastActive(false);
      setToastMessage("OPENING SOCIAL MEDIA WEBSITE");
    }, duration);
  };

  useEffect(() => {
    if (activePage !== "projects") return;
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % PROJECTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activePage]);

  useEffect(() => {
    if (unlockOpen && !unlockedDetails) {
      passwordInputRef.current?.focus();
    }
  }, [unlockOpen, unlockedDetails]);

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showGrid = (gridNumber: 1 | 2) => {
    setActivePage("home");
    setStatementOpen(false);
    setCarouselOpen(false);
    setFlippedSlides({});
    setActiveGrid(gridNumber);
  };

  const toggleCarousel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (carouselOpen) {
      setFlippedSlides({});
      setCarouselOpen(false);
    } else {
      setFlippedSlides({});
      setCarouselOpen(true);
    }
  };

  const goToSlide = (idx: number) => {
    setFlippedSlides({});
    setCurrentIndex((idx + totalSlides) % totalSlides);
  };

  const handleSocialNav = () => {
    const websiteWindow = window.open("about:blank", "_blank");
    showToast("OPENING SOCIAL MEDIA WEBSITE", 1000);

    if (websiteWindow) {
      websiteWindow.document.title = "Opening Social Media Website";
      websiteWindow.document.body.textContent = "OPENING SOCIAL MEDIA WEBSITE ...";
      websiteWindow.document.body.style.cssText =
        "margin:0;min-height:100vh;display:grid;place-items:center;background:#050508;color:#00f0ff;font:700 1.25rem Rajdhani,sans-serif;";
    }

    window.setTimeout(() => {
      if (websiteWindow && !websiteWindow.closed) {
        websiteWindow.location.href = "https://www.companyinfinity.com";
      } else {
        window.location.href = "https://www.companyinfinity.com";
      }
    }, 1000);
  };

  const openPaymentHistoryPage = () => {
    setActivePage("payments");
    setStatementOpen(false);
    if (paymentPageRef.current) {
      paymentPageRef.current.scrollTop = 0;
    }
  };

  const openUnlockPrompt = (tx: TransactionItem | null, revealAll: boolean) => {
    setSelectedPayment(tx);
    setRevealAllRequested(revealAll);
    setUnlockedDetails(null);
    setPasswordInput("");
    setPasswordError("");
    setUnlockOpen(true);
  };

  const closeUnlockModal = () => {
    setUnlockOpen(false);
    setSelectedPayment(null);
    setRevealAllRequested(false);
    setUnlockedDetails(null);
    setPasswordInput("");
    setPasswordError("");
  };

  const handleUnlockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlocking(true);
    setPasswordError("");

    try {
      const response = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const result = await response.json();
      if (!response.ok || result.unlocked !== true) {
        setPasswordError(
          result.error || "Incorrect password. Please try again."
        );
        passwordInputRef.current?.select();
        return;
      }

      if (revealAllRequested) {
        setAllNamesRevealed(true);
        closeUnlockModal();
        return;
      }

      if (selectedPayment) {
        setUnlockedDetails(selectedPayment);
      }
    } catch {
      setPasswordError("Unable to verify the password. Please try again.");
    } finally {
      setUnlocking(false);
    }
  };

  const filteredServices = useMemo(() => {
    const q = servicesSearch.toLowerCase();
    return SERVICES_LIST.filter((s) => s.toLowerCase().includes(q));
  }, [servicesSearch]);

  const filteredTransactions = useMemo(() => {
    const q = paymentSearch.trim().toLowerCase();
    if (!q) return TRANSACTIONS;
    return TRANSACTIONS.filter((tx) =>
      [tx.name, tx.type, tx.date, tx.amount, tx.direction, tx.month]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [paymentSearch]);

  const octTransactions = filteredTransactions.filter(
    (tx) => tx.month === "October 2026"
  );
  const sepTransactions = filteredTransactions.filter(
    (tx) => tx.month === "September 2026"
  );

  return (
    <>
      <header
        id="header"
        onClick={() => openExternal("https://www.haisuperhero.com")}
      />

      <main id="main">
        <div
          className={`image-wrapper${carouselOpen ? " hide-bg" : ""}`}
          id="imageWrapper"
        >
          <div className="top-action-row">
            <div
              className="lightning-btn"
              id="lightningBtn"
              aria-label="Open highlights"
              role="button"
              tabIndex={0}
              onClick={toggleCarousel}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleCarousel(e as unknown as React.MouseEvent);
                }
              }}
            >
              ⚡
            </div>

            <p
              className="company-text"
              id="companyBtn"
              onClick={() => {
                setStatementOpen(false);
                setActivePage("company");
              }}
            >
              COMPANY
            </p>
          </div>

          <div
            className="matrix-grid"
            id="matrixGrid1"
            style={{ display: activeGrid === 1 ? "grid" : "none" }}
          >
            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.universalinstitution.com")}
            >
              <i className="fa-solid fa-school matrix-icon" />
              <span className="matrix-name">SCHOOL</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.sirchildren.com")}
            >
              <i className="fa-solid fa-user matrix-icon" />
              <span className="matrix-name">CHILDREN</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.universalstartups.com")}
            >
              <i className="fa-solid fa-rocket matrix-icon" />
              <span className="matrix-name">Start-Ups</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.universaleducations.com")}
            >
              <i className="fa-solid fa-graduation-cap matrix-icon" />
              <span className="matrix-name">Scholarships</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.universaleducations.com")}
            >
              <i className="fa-solid fa-book matrix-icon" />
              <span className="matrix-name">COURSES</span>
            </div>

            <div
              className="matrix-card"
              id="paymentNavBtn"
              role="button"
              tabIndex={0}
              onClick={openPaymentHistoryPage}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openPaymentHistoryPage();
                }
              }}
            >
              <i className="fa-solid fa-indian-rupee-sign matrix-icon" />
              <span className="matrix-name">Payments</span>
            </div>
          </div>

          <div
            className="matrix-grid"
            id="matrixGrid2"
            style={{ display: activeGrid === 2 ? "grid" : "none" }}
          >
            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.haisuperhero.com")}
            >
              <i className="fa-solid fa-laptop-code matrix-icon" />
              <span className="matrix-name">Websites</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.haisuperhero.com")}
            >
              <i className="fa-solid fa-mobile-screen-button matrix-icon" />
              <span className="matrix-name">Apps</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.haisuperhero.com")}
            >
              <i className="fa-solid fa-chart-line matrix-icon" />
              <span className="matrix-name">Marketing</span>
            </div>

            <div
              className="matrix-card"
              aria-label="TRUST"
              onClick={() => openExternal("https://www.haisuperhero.com")}
            >
              <i className="fa-solid fa-shield-halved matrix-icon" />
              <span className="matrix-name">TRUST</span>
            </div>

            <div
              className="matrix-card"
              onClick={() => openExternal("https://www.haisuperhero.com")}
            >
              <i className="fa-solid fa-briefcase matrix-icon" />
              <span className="matrix-name">Join Team</span>
            </div>

            <div
              className="matrix-card"
              id="matrixCollabCard"
              aria-label="Collaborations"
              onClick={() => {
                setStatementOpen(false);
                setActivePage("projects");
              }}
            >
              <i className="fa-solid fa-handshake matrix-icon" />
              <span className="matrix-name">Collab</span>
            </div>
          </div>

          <div
            className="grid-carousel-row"
            role="navigation"
            aria-label="Matrix Grid Navigation"
            style={{ display: carouselOpen ? "none" : "flex" }}
          >
            <a
              href="tel:9963935878"
              className="corner-floating-icon left-icon"
              aria-label="Call Us"
            >
              <i className="fa-solid fa-phone" />
            </a>

            <div className="grid-carousel-dots">
              <div
                className={`grid-dot${activeGrid === 1 ? " active" : ""}`}
                id="gridDot1"
                title="School and Education"
                onClick={() => showGrid(1)}
              />
              <div
                className={`grid-dot${activeGrid === 2 ? " active" : ""}`}
                id="gridDot2"
                title="HAI Services"
                onClick={() => showGrid(2)}
              />
            </div>

            <a
              href="https://www.haisuperhero.com/chat"
              className="corner-floating-icon right-icon"
              aria-label="Open HAI SuperHero Website"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-message" />
            </a>
          </div>

          <div
            className={`carousel-overlay${carouselOpen ? " active" : ""}`}
            id="carouselOverlay"
          >
            <button
              className="carousel-btn prev"
              id="prevBtn"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(currentIndex - 1);
              }}
            >
              ❮
            </button>
            <button
              className="carousel-btn next"
              id="nextBtn"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(currentIndex + 1);
              }}
            >
              ❯
            </button>
            <div className="carousel-container">
              <div
                className="carousel-track"
                id="carouselTrack"
                style={{
                  width: `${totalSlides * 100}%`,
                  transform: `translate3d(-${currentIndex * (100 / totalSlides)}%,0,0)`,
                }}
              >
                {CAROUSEL_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.title}
                    className="carousel-slide"
                    style={{
                      flex: `0 0 ${100 / totalSlides}%`,
                      width: `${100 / totalSlides}%`,
                    }}
                  >
                    <div
                      className={`flip-card${flippedSlides[idx] ? " flipped" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedSlides((prev) => ({
                          ...prev,
                          [idx]: !prev[idx],
                        }));
                      }}
                    >
                      <div className="flip-card-front">
                        <img src={slide.img} alt={slide.alt} />
                      </div>
                      <div className="flip-card-back">
                        <div className="card-back-content">
                          <h2 className="card-back-title">{slide.title}</h2>
                          <ul className="card-back-list">
                            {slide.items.map((item, itemIdx) => (
                              <li
                                key={itemIdx}
                                style={
                                  item.fontSize
                                    ? { fontSize: item.fontSize }
                                    : undefined
                                }
                              >
                                <MultilineText text={item.text} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-dots" id="carouselDots">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`dot${currentIndex === idx ? " active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* INTEGRATED COMPANY PAGE LAYOUT */}
      <section
        className={`company-layout-page${activePage === "company" ? " active" : ""}`}
        id="companyLayoutPage"
      >
        <header id="topHeader">
          <button
            className="glow-btn"
            type="button"
            onClick={() => openExternal("https://www.haisuperhero.com")}
            aria-label="HUMAN'S ARTIFICIAL INTELLIGENCE"
          >
            <Rainbow3DText text="HUMAN'S ARTIFICIAL INTELLIGENCE" />
          </button>

          <div className="hai-title-blade-accent" />
        </header>

        <main id="pageImage">
          <img
            src="https://cdn.corenexis.com/f/nGzf1xyk.png"
            onClick={() => openExternal("https://www.haisuperhero.com")}
            alt="HUMAN'S ARTIFICIAL INTELLIGENCE"
          />
        </main>

        <footer id="bottomFooter">
          <div className="hai-title-blade-accents" />

          <button
            className="glow-btn"
            type="button"
            onClick={() => openExternal("https://www.haisuperhero.com")}
            aria-label="UNIVERSAL SERVICES PLATFORM"
          >
            <Rainbow3DText text="UNIVERSAL SERVICES PLATFORM" />
          </button>
        </footer>
      </section>

      {/* SERVICES PAGE */}
      <section
        className={`services-page${activePage === "services" ? " active" : ""}`}
        id="servicesPage"
      >
        <div className="services-page-header">
          <h2
            onClick={() => openExternal("https://www.haisuperhero.com")}
            className="social-title"
            style={{ cursor: "pointer" }}
          >
            UNIVERSAL SERVICES
          </h2>
          <button
            className="social-back-btn"
            id="servicesBackBtn"
            onClick={() => setActivePage("home")}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
        </div>
        <div className="services-search-wrapper">
          <input
            type="text"
            className="services-search-input"
            id="servicesSearchInput"
            placeholder="Search services..."
            value={servicesSearch}
            onChange={(e) => setServicesSearch(e.target.value)}
          />
          <i
            className="fa-solid fa-magnifying-glass"
            style={{ color: "#00f0ff", padding: "0 8px" }}
          />
        </div>
        <div className="ribbon-list-container">
          <div className="gold-pole left" />
          <div className="gold-pole right" />
          <div
            className="ribbon-stack"
            onClick={() => openExternal("https://www.haisuperhero.com")}
            id="ribbonStack"
          >
            {filteredServices.map((service) => (
              <div key={service} className="ribbon-item">
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLABORATION PAGE */}
      <section
        className={`collaboration-page${activePage === "collab" ? " active" : ""}`}
        id="collaborationPage"
      >
        <div className="collab-header">
          <h1 className="social-title">Collaborations</h1>
          <button
            className="social-back-btn"
            id="collabBackBtn"
            onClick={() => setActivePage("home")}
          >
            <i className="fa-solid fa-arrow-left" /> Back
          </button>
        </div>
        <div className="collab-content">
          <div className="collab-card">
            <h3>Partner with HAI</h3>
            <p>
              Join forces with Human&apos;s Artificial Intelligence to build
              next-generation software, scalable startups, and innovative tech
              ecosystems.
            </p>
            <button
              className="collab-btn"
              onClick={() => showToast("Initiating Partnership Request...")}
            >
              Partner Up
            </button>
          </div>
          <div className="collab-card">
            <h3>Enterprise &amp; Academic Alliances</h3>
            <p>
              We collaborate with universities, research institutions, and
              enterprises to pioneer advanced AI research, student skill
              programs, and joint developments.
            </p>
            <button
              className="collab-btn"
              onClick={() => showToast("Opening Alliance Form...")}
            >
              Join Alliance
            </button>
          </div>
          <div className="collab-card">
            <h3>Creator &amp; Influencer Network</h3>
            <p>
              Are you a tech creator, educator, or promoter? Partner with our
              universal startup to scale your impact and share cutting-edge tech
              solutions.
            </p>
            <button
              className="collab-btn"
              onClick={() => showToast("Connecting with Creators...")}
            >
              Collaborate Now
            </button>
          </div>
        </div>
      </section>

      {/* PAYMENT HISTORY PAGE */}
      <section
        ref={paymentPageRef}
        className={`payment-history-page${activePage === "payments" ? " active" : ""}`}
        id="paymentHistoryPage"
      >
        <div className="payment-header">
          <h1 className="upi-page-title">Our StartUp Payments</h1>
          <button
            className="social-back-btn"
            id="paymentBackBtn"
            onClick={() => setActivePage("home")}
          >
            <i className="fa-solid fa-arrow-left" />
          </button>
        </div>
        <div className="upi-app-bar">
          <div className="upi-header-right">
            <h2>History</h2>
            <button
              className="statements-btn"
              id="openStatementBtn"
              onClick={() => setStatementOpen(true)}
            >
              <i className="fa-regular fa-circle-down" /> Statements
            </button>
            <i
              className="fa-regular fa-circle-question help-circle-icon"
              id="helpCircleIcon"
              role="button"
              tabIndex={0}
              onClick={() => setStatementOpen(true)}
            />
            <button
              className="reveal-names-btn"
              id="revealNamesBtn"
              aria-label="Reveal all payment names"
              onClick={() => {
                if (allNamesRevealed) {
                  setAllNamesRevealed(false);
                } else {
                  openUnlockPrompt(null, true);
                }
              }}
            >
              <i
                className={
                  allNamesRevealed ? "fa-solid fa-eye-slash" : "fa-regular fa-eye"
                }
              />
            </button>
          </div>
        </div>
        <div className="upi-search-box">
          <div className="upi-search-left">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search"
              aria-label="Search payments"
              value={paymentSearch}
              onChange={(e) => setPaymentSearch(e.target.value)}
            />
          </div>
          <div className="upi-filter-btn">
            <i className="fa-solid fa-sliders" />
          </div>
        </div>

        {octTransactions.length > 0 && (
          <div className="upi-month-summary">
            <span>October 2026</span>
            <span className="upi-month-total">
              ₹1,550.9 <i className="fa-solid fa-chevron-right" />
            </span>
          </div>
        )}

        <div className="upi-transactions-list">
          {octTransactions.map((tx) => (
            <div key={tx.id} className="upi-transaction-item">
              <div className="upi-tx-left">
                <div className="upi-tx-icon-circle">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    style={tx.credited ? { transform: "rotate(180deg)" } : undefined}
                  />
                </div>
                <div className="upi-tx-details">
                  <span className="upi-tx-type">{tx.type}</span>
                  <button
                    className={`upi-barcode-trigger${allNamesRevealed ? " payment-name-revealed" : ""}`}
                    type="button"
                    onClick={() => openUnlockPrompt(tx, false)}
                  >
                    {allNamesRevealed ? (
                      tx.name
                    ) : (
                      <span className="barcode-art" aria-hidden="true">
                        {Array.from({ length: 17 }).map((_, i) => (
                          <i key={i} />
                        ))}
                      </span>
                    )}
                  </button>
                  <span className="upi-tx-time">{tx.date}</span>
                </div>
              </div>
              <div className="upi-tx-right">
                <span
                  className={`upi-tx-amount ${tx.credited ? "credited" : "debited"}`}
                >
                  {tx.displayAmount}
                </span>
                <span className="upi-tx-bank">
                  {tx.direction} <span className="bank-badge">🏦</span>
                </span>
              </div>
            </div>
          ))}

          {sepTransactions.length > 0 && (
            <div className="upi-month-summary">
              <span>September 2026</span>
              <span className="upi-month-total">
                ₹1,550.9 <i className="fa-solid fa-chevron-right" />
              </span>
            </div>
          )}

          {sepTransactions.map((tx) => (
            <div key={tx.id} className="upi-transaction-item">
              <div className="upi-tx-left">
                <div className="upi-tx-icon-circle">
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </div>
                <div className="upi-tx-details">
                  <span className="upi-tx-type">{tx.type}</span>
                  <button
                    className={`upi-barcode-trigger${allNamesRevealed ? " payment-name-revealed" : ""}`}
                    type="button"
                    onClick={() => openUnlockPrompt(tx, false)}
                  >
                    {allNamesRevealed ? (
                      tx.name
                    ) : (
                      <span className="barcode-art" aria-hidden="true">
                        {Array.from({ length: 17 }).map((_, i) => (
                          <i key={i} />
                        ))}
                      </span>
                    )}
                  </button>
                  <span className="upi-tx-time">{tx.date}</span>
                </div>
              </div>
              <div className="upi-tx-right">
                <span className="upi-tx-amount debited">
                  {tx.displayAmount}
                </span>
                <span className="upi-tx-bank">
                  {tx.direction} <span className="bank-badge">🏦</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATEMENT MODAL */}
      <section
        className={`statement-modal${statementOpen ? " active" : ""}`}
        id="statementModal"
      >
        <div className="stmt-header">
          <div className="stmt-header-left">
            <i
              className="fa-solid fa-arrow-left stmt-back-btn"
              id="closeStmtBtn"
              role="button"
              tabIndex={0}
              onClick={() => setStatementOpen(false)}
            />
            <h2 className="social-title">Our Start-Up Statement</h2>
          </div>
          <i className="fa-regular fa-circle-question help-circle-icon" />
        </div>
        <div className="stmt-body">
          <div>
            <div className="section-label">Statement Period</div>
            <div className="tab-pill-container">
              <div
                className={`tab-pill${statementTab === "range" ? " active" : ""}`}
                id="tabRange"
                role="button"
                tabIndex={0}
                onClick={() => setStatementTab("range")}
              >
                Range
              </div>
              <div
                className={`tab-pill${statementTab === "fy" ? " active" : ""}`}
                id="tabFY"
                role="button"
                tabIndex={0}
                onClick={() => setStatementTab("fy")}
              >
                Financial year
              </div>
            </div>
            <div
              className="stmt-options-group"
              id="rangeOptions"
              style={{ display: statementTab === "range" ? "flex" : "none" }}
            >
              {[
                "Last 30 days",
                "Last 90 days",
                "Last 180 days",
                "Last 365 days",
              ].map((opt) => (
                <div
                  key={opt}
                  className="stmt-option-row"
                  onClick={() => setSelectedRange(opt)}
                >
                  <span className="stmt-option-title">{opt}</span>
                  <div
                    className={`circle-select${selectedRange === opt ? " checked" : ""}`}
                  >
                    {selectedRange === opt && (
                      <i className="fa-solid fa-check" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="stmt-options-group"
              id="fyOptions"
              style={{ display: statementTab === "fy" ? "flex" : "none" }}
            >
              {["Current FY", "FY 2025 - 2026"].map((opt) => (
                <div
                  key={opt}
                  className="stmt-option-row"
                  onClick={() => setSelectedFy(opt)}
                >
                  <span className="stmt-option-title">{opt}</span>
                  <div
                    className={`circle-select${selectedFy === opt ? " checked" : ""}`}
                  >
                    {selectedFy === opt && <i className="fa-solid fa-check" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="stmt-divider" />
          <div>
            <div className="section-label">File Type</div>
            <div className="stmt-options-group">
              <div
                className="stmt-option-row"
                onClick={() => setSelectedFileType("PDF")}
              >
                <div className="stmt-option-text">
                  <span className="stmt-option-title">PDF</span>
                  <span className="stmt-option-desc">
                    Suitable for viewing on mobile and sharing
                  </span>
                </div>
                <div
                  className={`checkbox-select${selectedFileType === "PDF" ? " checked" : ""}`}
                >
                  {selectedFileType === "PDF" && (
                    <i className="fa-solid fa-check" />
                  )}
                </div>
              </div>
              <div
                className="stmt-option-row"
                onClick={() => setSelectedFileType("CSV")}
              >
                <div className="stmt-option-text">
                  <span className="stmt-option-title">CSV</span>
                  <span className="stmt-option-desc">
                    Suitable for analysis in spreadsheets
                  </span>
                </div>
                <div
                  className={`checkbox-select${selectedFileType === "CSV" ? " checked" : ""}`}
                >
                  {selectedFileType === "CSV" && (
                    <i className="fa-solid fa-check" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="download-stmt-btn"
            onClick={() =>
              showToast(
                `Preparing ${selectedFileType} statement (${
                  statementTab === "range" ? selectedRange : selectedFy
                })...`
              )
            }
          >
            Download Statement
          </button>
        </div>
      </section>

      {/* PASSWORD-PROTECTED PAYMENT DETAILS MODAL */}
      <section
        className={`payment-unlock-modal${unlockOpen ? " active" : ""}`}
        id="paymentUnlockModal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeUnlockModal();
        }}
      >
        <div className="payment-unlock-card">
          {!unlockedDetails ? (
            <div id="paymentPasswordView">
              <h2>
                <i className="fa-solid fa-lock" /> Protected Payment Details
              </h2>
              <p>
                We strictly adhere to all the government bodies and laws,
                ensuring every paisa is transparent, traceable, and fully
                accountable to the government.
              </p>
              <form id="paymentPasswordForm" onSubmit={handleUnlockSubmit}>
                <input
                  ref={passwordInputRef}
                  id="paymentDetailsPassword"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
                <div className="payment-unlock-actions">
                  <button
                    type="submit"
                    id="unlockPaymentBtn"
                    disabled={unlocking}
                  >
                    {unlocking ? "Checking..." : "Unlock Details"}
                  </button>
                  <button
                    type="button"
                    id="cancelPaymentUnlockBtn"
                    onClick={closeUnlockModal}
                  >
                    Cancel
                  </button>
                </div>
                <div
                  id="paymentPasswordError"
                  style={{
                    color: "#ff6b81",
                    marginTop: "8px",
                    fontSize: "0.85rem",
                  }}
                  aria-live="polite"
                >
                  {passwordError}
                </div>
              </form>
            </div>
          ) : (
            <div id="paymentDetailsView">
              <h2>
                <i className="fa-solid fa-receipt" /> Payment Details
              </h2>
              <div className="payment-detail-list" id="paymentDetailList">
                {[
                  ["Name", unlockedDetails.name],
                  ["Type", unlockedDetails.type],
                  ["Date", unlockedDetails.date],
                  ["Amount", unlockedDetails.amount],
                  ["Account status", unlockedDetails.direction],
                ].map(([label, val]) => (
                  <div key={label} className="payment-detail-row">
                    <span>{label}</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              <div
                className="payment-unlock-actions"
                style={{ marginTop: "18px" }}
              >
                <button
                  type="button"
                  id="closePaymentDetailsBtn"
                  onClick={closeUnlockModal}
                >
                  Close Details
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PAGE 4 - OUR PROJECTS (MILESTONE COLLABORATIONS) */}
      <section
        className={`page-container${activePage === "projects" ? " active" : ""}`}
        id="projectsPage"
        style={{
          display: activePage === "projects" ? "block" : "none",
          position: "fixed",
          inset: 0,
          zIndex: 2600,
          overflowY: "auto",
          background: "linear-gradient(135deg, #07111f, #101827, #172033)",
          color: "white",
        }}
      >
        <header
          className="projects-header"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(15, 23, 42, 0.97)",
            backdropFilter: "blur(10px)",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(0, 188, 212, 0.5)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
          }}
        >
          <h1
            style={{
              color: "#00e5ff",
              fontSize: "18px",
              fontWeight: 800,
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            Our Milestone Collaborations
          </h1>
          <button
            className="social-back-btn"
            id="projectsBackBtn"
            onClick={() => setActivePage("home")}
          >
            <i className="fa-solid fa-arrow-left" /> Back
          </button>
        </header>

        <div
          className="projects-passage"
          style={{
            maxWidth: "900px",
            margin: "30px auto 10px auto",
            padding: "0 20px",
            textAlign: "center",
            fontSize: "15px",
            fontWeight: 800,
            lineHeight: 1.6,
            color: "#ffffff",
          }}
        >
          Though we collaborated with a huge number of businesses for their
          complete software developments. Few of these will stay forever in our
          hearts because our journey takes milestone turns with these special
          collaborations.
        </div>

        <div
          className="projects-carousel"
          style={{
            width: "95%",
            maxWidth: "1000px",
            height: "350px",
            margin: "20px auto 40px auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.55)",
          }}
        >
          <div
            className="projects-track"
            id="projectsTrack"
            style={{
              display: "flex",
              height: "350px",
              transition: "transform 0.6s ease",
              transform: `translateX(-${currentProject * 100}%)`,
            }}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.title}
                className="project-slide"
                style={{
                  width: "100%",
                  flexShrink: 0,
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => openExternal(project.url)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "500px",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
                <div
                  className="project-overlay"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "70px 30px 25px",
                    background:
                      "linear-gradient(transparent, rgba(0, 0, 0, 0.9))",
                  }}
                >
                  <h2 style={{ fontSize: "28px", marginBottom: "5px" }}>
                    {project.title}
                  </h2>
                  <p style={{ color: "#d1d5db", fontSize: "15px" }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="projects-carousel-buttons"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 15px",
              pointerEvents: "none",
            }}
          >
            <button
              onClick={() =>
                setCurrentProject(
                  (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length
                )
              }
              style={{
                width: "50px",
                height: "50px",
                border: "none",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.8)",
                color: "#111827",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              ❮
            </button>
            <button
              onClick={() =>
                setCurrentProject((prev) => (prev + 1) % PROJECTS.length)
              }
              style={{
                width: "50px",
                height: "50px",
                border: "none",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.8)",
                color: "#111827",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              ❯
            </button>
          </div>

          <div
            className="projects-carousel-dots"
            id="projectsDots"
            style={{
              position: "absolute",
              bottom: "15px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
              zIndex: 10,
            }}
          >
            {PROJECTS.map((project, idx) => (
              <button
                key={project.title}
                className="project-dot"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentProject(idx);
                }}
                style={{
                  width: idx === currentProject ? "25px" : "9px",
                  height: "9px",
                  border: "none",
                  borderRadius: idx === currentProject ? "10px" : "50%",
                  background:
                    idx === currentProject
                      ? "#00e5ff"
                      : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <div
        className={`social-opening-message${toastActive ? " active" : ""}`}
        id="socialOpeningMessage"
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-nav-content">
          <button
            id="chromeNavBtn"
            aria-label="Services"
            title="Services"
            onClick={() => {
              setStatementOpen(false);
              setActivePage("services");
            }}
          >
            <i className="fa-brands fa-chrome matrix-icon" />
          </button>
          <button
            id="homeNavBtn"
            aria-label="Home"
            title="Home"
            onClick={() => showGrid(1)}
          >
            <i className="fa-solid fa-house matrix-icon" />
          </button>
          <button
            id="socialNavBtn"
            aria-label="Social media"
            title="Social media"
            onClick={handleSocialNav}
          >
            <i className="fa-solid fa-bullhorn matrix-icon" />
          </button>
        </div>
      </footer>
    </>
  );
}
