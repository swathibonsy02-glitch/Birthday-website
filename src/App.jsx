import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  Music2,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { birthdayContent } from "./data/birthdayContent";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const particleColors = ["#f5e9df", "#c77d87", "#801d32", "#ffffff"];

function FloatingParticleField({ intensity = 18 }) {
  const prefersReducedMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: intensity }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 5,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 8,
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
      })),
    [intensity]
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: [0.2, 0.65, 0.2] }
              : {
                  y: [0, -20, 0],
                  opacity: [0.15, 0.6, 0.15],
                  x: [0, Math.random() * 18 - 9, 0],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SectionReveal({ children, className = "", delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function IntroSection({ onReveal }) {
  const [started, setStarted] = useState(false);
  const [showLineTwo, setShowLineTwo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timerOne = setTimeout(() => setStarted(true), 500);
    const timerTwo = setTimeout(() => setShowLineTwo(true), 1900);
    const timerThree = setTimeout(() => setShowButton(true), 3600);

    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
      clearTimeout(timerThree);
    };
  }, []);

  return (
    <div className="intro-overlay">
      <FloatingParticleField intensity={30} />
      <motion.div
        className="intro-panel"
        initial={{ opacity: 1 }}
        animate={{ opacity: started ? 0.96 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          {birthdayContent.intro.eyebrow}
        </motion.p>

        <motion.h1
          className="intro-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          {birthdayContent.intro.lineOne}
        </motion.h1>

        {showLineTwo && (
          <motion.p
            className="intro-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {birthdayContent.intro.lineTwo}
          </motion.p>
        )}

        {showButton && (
          <motion.button
            type="button"
            className="primary-button"
            onClick={onReveal}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {birthdayContent.intro.button}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

function BirthdayHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero section-shell">
      <FloatingParticleField intensity={18} />
      <motion.div
        className="hero-inner"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <p className="eyebrow hero-eyebrow">{birthdayContent.hero.title}</p>
        <h1 className="cinematic-heading">{birthdayContent.hero.title}</h1>
        <p className="hero-copy">{birthdayContent.hero.subtitle}</p>
        <p className="handwritten-line">{birthdayContent.hero.handwritten}</p>
        <div className="scroll-indicator">
          <span>{birthdayContent.hero.scrollLabel}</span>
          <ArrowDown size={18} />
        </div>
      </motion.div>

      <motion.div
        className="floating-heart heart-one"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -12, 0], opacity: [0.2, 0.7, 0.2] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ♥
      </motion.div>
      <motion.div
        className="floating-heart heart-two"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -15, 0], opacity: [0.2, 0.8, 0.2] }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        ♥
      </motion.div>
    </section>
  );
}

function AlbumSection() {
  const albumPhotos = useMemo(
    () => [
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.04 AM.jpeg"
        ),
        caption: "A quiet little memory",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.05 AM (1).jpeg"
        ),
        caption: "A smile I never get tired of",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.05 AM.jpeg"
        ),
        caption: "The little things that matter",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.06 AM (1).jpeg"
        ),
        caption: "A beautiful moment between us",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.06 AM (2).jpeg"
        ),
        caption: "The kind of happiness I want forever",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.06 AM.jpeg"
        ),
        caption: "Somewhere between laughter and love",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.07 AM (1).jpeg"
        ),
        caption: "A memory I keep close to my heart",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.07 AM (2).jpeg"
        ),
        caption: "All the little ways you make life softer",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 11.42.07 AM.jpeg"
        ),
        caption: "Always us, always home",
        date: "Our story",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.38 PM (1).jpeg"
        ),
        caption: "Sweet little moment",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.38 PM (2).jpeg"
        ),
        caption: "Soft smiles and warm memories",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.38 PM (3).jpeg"
        ),
        caption: "Our favorite kind of togetherness",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.38 PM.jpeg"
        ),
        caption: "A memory I want to keep forever",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.39 PM (1).jpeg"
        ),
        caption: "The comfort of being with you",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.39 PM (2).jpeg"
        ),
        caption: "The small things, the big feelings",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.39 PM (3).jpeg"
        ),
        caption: "A little piece of our world",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.39 PM.jpeg"
        ),
        caption: "Looking at you feels like home",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.40 PM (1).jpeg"
        ),
        caption: "A day I want to remember always",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.40 PM (2).jpeg"
        ),
        caption: "The kind of warmth I always crave",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.40 PM (3).jpeg"
        ),
        caption: "Making memories with you feels easy",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.40 PM.jpeg"
        ),
        caption: "Every moment with you matters",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.41 PM (1).jpeg"
        ),
        caption: "A moment worth holding onto",
        date: "Moments",
      },
      {
        src: encodeURI(
          "/images/album/WhatsApp Image 2026-11-01 at 8.18.41 PM.jpeg"
        ),
        caption: "Forever feels warmer with you",
        date: "Moments",
      },
    ],
    []
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState(null);
  const totalPages = Math.max(1, Math.ceil(albumPhotos.length / 2));
  const spread = albumPhotos.slice(pageIndex * 2, pageIndex * 2 + 2);

  const turnPage = (direction) => {
    if (flipping) return;

    if (direction === "next" && pageIndex < totalPages - 1) {
      setFlipping("next");
      window.setTimeout(() => {
        setPageIndex((current) => current + 1);
        setFlipping(null);
      }, 620);
      return;
    }

    if (direction === "prev" && pageIndex > 0) {
      setFlipping("prev");
      window.setTimeout(() => {
        setPageIndex((current) => current - 1);
        setFlipping(null);
      }, 620);
    }
  };

  return (
    <section className="album section-shell" id="album">
      <SectionReveal className="section-heading-wrap centered">
        <p className="eyebrow">{birthdayContent.album.title}</p>
        <h2>{birthdayContent.album.title}</h2>
        <p className="album-intro">{birthdayContent.album.intro}</p>
      </SectionReveal>

      <div className="album-book-shell">
        <div className="album-book" aria-live="polite">
          <div className="book-spine" aria-hidden="true" />

          <div className="album-pages">
            {spread.map((image, index) => {
              const isLeft = index === 0;
              const pageTurnDirection = isLeft ? "prev" : "next";
              const isTurning = flipping === pageTurnDirection;

              return (
                <button
                  key={`${pageIndex}-${index}-${image.src}`}
                  type="button"
                  className={`album-page ${
                    isLeft ? "left-page" : "right-page"
                  } ${isTurning ? "turning" : ""}`}
                  onClick={() => turnPage(pageTurnDirection)}
                  aria-label={`Open ${image.caption}`}
                >
                  <div className="page-inner">
                    <img
                      src={image.src}
                      alt={image.caption}
                      onError={(event) => {
                        event.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(`
                            <svg xmlns='http://www.w3.org/2000/svg' width='900' height='900' viewBox='0 0 900 900'>
                              <defs>
                                <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
                                  <stop offset='0%' stop-color='#1d1017'/>
                                  <stop offset='100%' stop-color='#4a101d'/>
                                </linearGradient>
                              </defs>
                              <rect width='900' height='900' fill='url(#g)'/>
                              <circle cx='450' cy='330' r='120' fill='rgba(245,233,223,0.18)'/>
                              <text x='450' y='520' text-anchor='middle' fill='#F5E9DF' font-size='42' font-family='Georgia, serif'>Our memory</text>
                            </svg>
                          `);
                      }}
                    />
                    <div className="page-caption">
                      <span>{image.caption}</span>
                      <small>{image.date}</small>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="album-controls">
          <button
            type="button"
            className="album-nav-button"
            onClick={() => turnPage("prev")}
            disabled={pageIndex === 0}
          >
            Previous
          </button>

          <span className="album-page-indicator">
            Page {pageIndex + 1} / {totalPages}
          </span>

          <button
            type="button"
            className="album-nav-button"
            onClick={() => turnPage("next")}
            disabled={pageIndex >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function ThingsILove() {
  return (
    <section className="loves section-shell" id="loves">
      <SectionReveal className="section-heading-wrap centered">
        <p className="eyebrow">{birthdayContent.loves.title}</p>
        <h2>{birthdayContent.loves.title}</h2>
      </SectionReveal>

      <div className="love-list">
        {birthdayContent.loves.messages.map((message, index) => (
          <SectionReveal
            key={message}
            className="love-item"
            delay={index * 0.12}
          >
            <span className="love-index">0{index + 1}</span>
            <p>{message}</p>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}

function OpenHeartSection({ onRevealMainLetter = null, introOnly = false }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened((current) => {
      const next = !current;
      if (next) {
        onRevealMainLetter?.();
      }
      return next;
    });
  };

  return (
    <section className="open-heart section-shell" id="open-heart">
      <SectionReveal className="open-heart-wrap centered">
        <p className="eyebrow">{birthdayContent.openHeart.header}</p>
        <motion.div
          className={`heart-trigger ${opened ? "opened" : ""}`}
          initial={{ scale: 0.85, opacity: 0.85 }}
          animate={{ scale: opened ? 1.4 : 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          ♥
        </motion.div>

        <motion.button
          type="button"
          className="primary-button"
          onClick={handleOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {birthdayContent.openHeart.button}
        </motion.button>

        <AnimatePresence mode="wait">
          {opened && (
            <motion.div
              key="open-heart-letter"
              className="open-heart-letter"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.8 }}
            >
              {birthdayContent.letter.text
                .split("\n")
                .map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`}>{paragraph}</p>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </SectionReveal>
    </section>
  );
}

function ApologyEnvelope() {
  const [opened, setOpened] = useState(false);
  const paragraphs = birthdayContent.apology.message.split("\n\n");

  return (
    <section className="apology section-shell" id="apology">
      <SectionReveal className="section-heading-wrap centered">
        <p className="eyebrow">{birthdayContent.apology.title}</p>
      </SectionReveal>

      <div className="apology-scene">
        <motion.div
          className={`apology-envelope ${opened ? "opened" : ""}`}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="envelope-flap" aria-hidden="true" />
          <div className="envelope-paper" aria-hidden="true" />
          <motion.button
            type="button"
            className={`letter-heart-toggle heart-seal ${
              opened ? "opened" : ""
            }`}
            onClick={() => setOpened((current) => !current)}
            aria-label={opened ? "Close apology letter" : "Open apology letter"}
            initial={{ scale: 1 }}
            animate={{
              scale: opened ? 1.12 : 1,
              rotate: opened ? 8 : 0,
              boxShadow: opened
                ? "0 0 0 6px rgba(128, 29, 50, 0.08), 0 14px 26px rgba(128, 29, 50, 0.18)"
                : "0 10px 22px rgba(128, 29, 50, 0.14)",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            ♥
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {opened && (
            <motion.div
              className="apology-letter"
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function BirthdayBalloon({
  balloon,
  index,
  isPopped,
  onPop,
  prefersReducedMotion = false,
}) {
  const handlePop = () => {
    if (isPopped) return;
    onPop(balloon.id);
  };

  return (
    <motion.button
      type="button"
      className={`balloon ${isPopped ? "popped" : ""}`}
      onClick={handlePop}
      aria-label={isPopped ? "Balloon popped" : "Pop balloon"}
      style={{
        left: balloon.left,
        background: `radial-gradient(circle at 30% 30%, #fff, ${balloon.color} 45%, ${balloon.accent} 100%)`,
        animationDelay: `${index * 0.1}s`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : isPopped
          ? { opacity: 0, y: 26, scale: 0.7 }
          : { opacity: 1, y: [0, -8, 0], rotate: [0, 2, -2, 0] }
      }
      transition={{
        opacity: { duration: 0.4 },
        y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={isPopped ? undefined : { scale: 1.05 }}
      whileTap={isPopped ? undefined : { scale: 0.98 }}
    >
      <span className="balloon-highlight" aria-hidden="true" />
      <span className="balloon-string" aria-hidden="true" />
    </motion.button>
  );
}

function BirthdayCelebration({ onRevealMainWebsite }) {
  const balloons = [
    { id: 1, left: "8%", color: "#ffbfd7", accent: "#d76c85" },
    { id: 2, left: "25%", color: "#f7d8b5", accent: "#d7956d" },
    { id: 3, left: "42%", color: "#d3e4ff", accent: "#7b9bd6" },
    { id: 4, left: "60%", color: "#f4d0ff", accent: "#ba7ecf" },
    { id: 5, left: "77%", color: "#ffd7dc", accent: "#ce6d84" },
  ];

  const [popped, setPopped] = useState([]);
  const [cakeCut, setCakeCut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePop = (id) => {
    setPopped((current) => (current.includes(id) ? current : [...current, id]));
  };

  useEffect(() => {
    if (popped.length !== balloons.length) return;

    const timer = setTimeout(() => setShowMessage(true), 700);
    return () => clearTimeout(timer);
  }, [popped.length, balloons.length]);

  const allPopped = popped.length === balloons.length;
  const canRevealWebsite = allPopped && cakeCut;

  return (
    <section className="birthday-stage" aria-live="polite">
      <div className="birthday-stage-inner">
        <p className="eyebrow birthday-kicker">
          {birthdayContent.intro.eyebrow}
        </p>
        <motion.h1
          className="birthday-heading"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Happy Birthday, Pattukutty
        </motion.h1>

        <motion.p
          className="birthday-message"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {birthdayContent.gift.message.split("\n\n")[0]}
        </motion.p>

        <motion.p
          className="birthday-instruction"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Make 5 wishes, pop all five balloons, and cut the cake to begin the
          surprise. 🎈🎂✨
        </motion.p>

        <div className="balloon-tray" aria-label="Balloon surprise">
          {balloons.map((balloon, index) => (
            <BirthdayBalloon
              key={balloon.id}
              balloon={balloon}
              index={index}
              isPopped={popped.includes(balloon.id)}
              onPop={handlePop}
              prefersReducedMotion={false}
            />
          ))}
        </div>

        <div className="birthday-cake-panel">
          <div className={`cake-scene ${cakeCut ? "cut" : ""}`}>
            <div className="cake-stand" aria-hidden="true" />

            <div className="cake-tier cake-tier-top" aria-hidden="true">
              <div className="cake-tier-inner">
                <span className="piped piped-1" />
                <span className="piped piped-2" />
                <span className="piped piped-3" />
                <span className="piped piped-4" />
                <span className="sprinkle sprinkle-1" />
                <span className="sprinkle sprinkle-2" />
                <span className="sprinkle sprinkle-3" />
                <span className="sprinkle sprinkle-4" />
                <span className="berry berry-left" />
                <span className="berry berry-right" />
                <span className="cake-side-blush" />
              </div>
            </div>

            <div className="cake-tier cake-tier-middle" aria-hidden="true">
              <div className="cake-tier-inner">
                <span className="piped piped-1" />
                <span className="piped piped-2" />
                <span className="piped piped-3" />
                <span className="piped piped-4" />
                <span className="sprinkle sprinkle-1" />
                <span className="sprinkle sprinkle-2" />
                <span className="sprinkle sprinkle-3" />
                <span className="sprinkle sprinkle-4" />
                <span className="berry berry-left" />
                <span className="berry berry-right" />
                <span className="cake-side-blush" />
              </div>
            </div>

            <div className="cake-tier cake-tier-bottom" aria-hidden="true">
              <div className="cake-tier-inner">
                <span className="drip drip-1" />
                <span className="drip drip-2" />
                <span className="drip drip-3" />
                <span className="drip drip-4" />
                <span className="piped piped-1" />
                <span className="piped piped-2" />
                <span className="piped piped-3" />
                <span className="piped piped-4" />
                <span className="sprinkle sprinkle-1" />
                <span className="sprinkle sprinkle-2" />
                <span className="sprinkle sprinkle-3" />
                <span className="sprinkle sprinkle-4" />
                <span className="berry berry-left" />
                <span className="berry berry-right" />
                <span className="cake-side-blush" />
              </div>
            </div>

            <div className="cake-candles" aria-hidden="true">
              {[0, 1, 2, 3].map((candle) => (
                <span
                  key={candle}
                  className="candle"
                  style={{ left: `${18 + candle * 22}%` }}
                >
                  <span className="flame" />
                </span>
              ))}
            </div>

            <div className="cake-half cake-half-left" aria-hidden="true">
              <div className="cake-half-inner" />
            </div>
            <div className="cake-half cake-half-right" aria-hidden="true">
              <div className="cake-half-inner" />
            </div>
            <div className="cake-cut-line" aria-hidden="true" />
            <div className="cake-knife" aria-hidden="true">
              <span className="knife-blade" />
              <span className="knife-handle" />
            </div>
          </div>

          <button
            type="button"
            className="cut-cake-button"
            onClick={() => setCakeCut(true)}
            disabled={cakeCut}
          >
            {cakeCut ? "Cake cut!" : "Cut the cake"}
          </button>

          {canRevealWebsite && (
            <motion.button
              type="button"
              className="primary-button"
              onClick={onRevealMainWebsite}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              OPEN YOUR SURPRISE ❤️
            </motion.button>
          )}

          {showMessage && allPopped && (
            <motion.div
              className="cake-message-wrap"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="cake-message">{birthdayContent.gift.message}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return (
    <div className="top-actions">
      <div
        className="music-player"
        aria-label={birthdayContent.music.ariaLabel}
      >
        <audio
          ref={audioRef}
          src={birthdayContent.music.audioPath}
          preload="auto"
        />
      </div>
    </div>
  );
}

function HugAnimation() {
  const [hugging, setHugging] = useState(false);

  return (
    <section className="hug-animation section-shell" id="hug">
      <SectionReveal className="section-heading-wrap centered">
        <p className="eyebrow">{birthdayContent.final.intro}</p>
      </SectionReveal>

      <div className="hug-controls">
        <motion.button
          type="button"
          className="primary-button"
          onClick={() => setHugging((current) => !current)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {birthdayContent.final.button}
        </motion.button>
      </div>

      <AnimatePresence>
        {hugging && (
          <motion.div
            className="hug-message-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="hug-photo-wrap"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                className="hug-photo"
                src="/story/story images/kissing scene in my house corridor.jpeg"
                alt="A romantic moment between us"
              />
            </motion.div>
            <span className="hug-message">
              {birthdayContent.final.hugMessage}
            </span>
            <span className="hug-love">
              {birthdayContent.final.loveMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function StoryVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleToggle = async () => {
    const video = videoRef.current;

    if (showVideo) {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setShowVideo(false);
      setIsPlaying(false);
      setHasStarted(false);
      return;
    }

    setShowVideo(true);
    requestAnimationFrame(() => {
      const nextVideo = videoRef.current;
      if (!nextVideo) return;

      nextVideo.currentTime = 0;
      nextVideo
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch((error) => {
          console.error("Video play failed:", error);
        });
    });
  };

  return (
    <section className="story-video section-shell" id="story-video">
      <SectionReveal className="story-video-card centered">
        <p className="eyebrow">Click to See Our Story ❤️</p>

        <motion.button
          type="button"
          className="video-trigger-button"
          onClick={handleToggle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Play our story video"
        >
          Click to See Our Story ❤️
        </motion.button>

        <p className="story-video-subtitle">
          And the final surprise arrives... 🥹✨
        </p>

        {showVideo && (
          <div className="video-placeholder-wrap">
            <div className="video-player-shell" onClick={handleToggle}>
              <video
                ref={videoRef}
                className="video-player"
                src="/story/story images/WhatsApp Video 2026-11-01 at 4.05.05 PM.mp4"
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                aria-label="Our story video"
              />

              {!hasStarted && (
                <div className="video-overlay-controls">
                  <motion.button
                    type="button"
                    className="video-control-button video-main-toggle"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleToggle();
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    aria-label="Play our story video"
                  >
                    <Play size={26} fill="currentColor" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}

function FinalMessage() {
  return (
    <section className="final-message section-shell" id="final-message">
      <div className="final-message-box">
        <p className="eyebrow">{birthdayContent.final.intro}</p>
        <h2>{birthdayContent.final.title}</h2>
        <p className="final-message-body">{birthdayContent.final.body}</p>
        <p className="final-love-line">{birthdayContent.final.loveMessage}</p>
        <div className="final-hug-card">
          <p>{birthdayContent.final.finalMessage}</p>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showBirthdayStage, setShowBirthdayStage] = useState(false);
  const [showMainWebsite, setShowMainWebsite] = useState(false);

  const revealMainWebsite = () => {
    setShowBirthdayStage(false);
    setShowMainWebsite(true);
  };

  if (showIntro) {
    return (
      <IntroSection
        onReveal={() => {
          setShowIntro(false);
          setShowBirthdayStage(true);
        }}
      />
    );
  }

  if (showBirthdayStage) {
    return (
      <>
        <BirthdayCelebration onRevealMainWebsite={revealMainWebsite} />
      </>
    );
  }

  return (
    <div className="page-shell">
      <div className="content-shell">
        <BirthdayHero />
        <AlbumSection />
        <ThingsILove />
        <OpenHeartSection />
        <ApologyEnvelope />
        <GhibliAlbumSection />
        <StoryVideoSection />
        <HugAnimation />
        <FinalMessage />
      </div>
    </div>
  );
}

function GhibliAlbumSection() {
  const albumPhotos = useMemo(
    () => [
      {
        src: "/story/story images/bday treat on nov 2024.jpeg",
        caption: "Birthday treat in November 2024",
        date: "Memory 01",
      },
      {
        src: "/story/story images/bike ride in eccr road.jpeg",
        caption: "Bike ride on the ECR road",
        date: "Memory 02",
      },
      {
        src: "/story/story images/bike ride in ecr road during my ramapuram institute time'.jpeg",
        caption: "Ride days during my college time",
        date: "Memory 03",
      },
      {
        src: "/story/story images/chennai metro first meet scene.png",
        caption: "Our first metro meeting",
        date: "Memory 04",
      },
      {
        src: "/story/story images/coconut drink when i come back from mysore everytime.png",
        caption: "Coconut drink after Mysore days",
        date: "Memory 05",
      },
      {
        src: "/story/story images/eating time.jpeg",
        caption: "Eating time with you",
        date: "Memory 06",
      },
      {
        src: "/story/story images/first meet movie time.jpeg",
        caption: "Our first movie time",
        date: "Memory 07",
      },
      {
        src: "/story/story images/future.png",
        caption: "Our future",
        date: "Memory 08",
      },
      {
        src: "/story/story images/hands together.png",
        caption: "Hands together",
        date: "Memory 09",
      },
      {
        src: "/story/story images/he pranked i cried so he gave chocolate and consoled me.jpeg",
        caption: "You made me smile even when I cried",
        date: "Memory 10",
      },
      {
        src: "/story/story images/i gave him headphone near by my house'.jpeg",
        caption: "Small gestures, big love",
        date: "Memory 11",
      },
      {
        src: "/story/story images/kissing scene in my house corridor.jpeg",
        caption: "Our little home memories",
        date: "Memory 12",
      },
      {
        src: "/story/story images/late night talk first time.png",
        caption: "Late-night talks",
        date: "Memory 13",
      },
      {
        src: "/story/story images/metro scene on his bday nov 2024.jpeg",
        caption: "Birthday metro moments",
        date: "Memory 14",
      },
      {
        src: "/story/story images/once i said i am hungry so he bought cookies on night.jpeg",
        caption: "Cookies for me when I was hungry",
        date: "Memory 15",
      },
      {
        src: "/story/story images/waited in ecr road foof court as it rains.jpeg",
        caption: "Waiting together in the rain",
        date: "Memory 16",
      },
      {
        src: "/story/story images/we eat fried rice together in my room at night.jpeg",
        caption: "Late-night fried rice dates",
        date: "Memory 17",
      },
    ],
    []
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState(null);
  const totalPages = Math.max(1, Math.ceil(albumPhotos.length / 2));
  const spread = albumPhotos.slice(pageIndex * 2, pageIndex * 2 + 2);

  const turnPage = (direction) => {
    if (flipping) return;

    if (direction === "next" && pageIndex < totalPages - 1) {
      setFlipping("next");
      window.setTimeout(() => {
        setPageIndex((current) => current + 1);
        setFlipping(null);
      }, 620);
      return;
    }

    if (direction === "prev" && pageIndex > 0) {
      setFlipping("prev");
      window.setTimeout(() => {
        setPageIndex((current) => current - 1);
        setFlipping(null);
      }, 620);
    }
  };

  return (
    <section className="ghibli-album section-shell" id="ghibli-album">
      <SectionReveal className="section-heading-wrap centered">
        <p className="eyebrow">Memories to remember🌸🎨</p>
        <h2>Memories to remember 🌸</h2>
      </SectionReveal>

      <div className="ghibli-album-shell">
        <div className="ghibli-book" aria-live="polite">
          <div className="ghibli-book-spine" aria-hidden="true" />

          <div className="ghibli-album-pages">
            {spread.map((image, index) => {
              const isLeft = index === 0;
              const pageTurnDirection = isLeft ? "prev" : "next";
              const isTurning = flipping === pageTurnDirection;

              return (
                <button
                  key={`${pageIndex}-${index}-${image.src}`}
                  type="button"
                  className={`ghibli-page ${
                    isLeft ? "left-page" : "right-page"
                  } ${isTurning ? "turning" : ""}`}
                  onClick={() => turnPage(pageTurnDirection)}
                  aria-label={`Open ${image.caption}`}
                >
                  <div className="ghibli-page-inner">
                    <img
                      src={image.src}
                      alt={image.caption}
                      onError={(event) => {
                        event.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(`
                            <svg xmlns='http://www.w3.org/2000/svg' width='900' height='900' viewBox='0 0 900 900'>
                              <defs>
                                <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
                                  <stop offset='0%' stop-color='#f5d7d0'/>
                                  <stop offset='100%' stop-color='#c9dcec'/>
                                </linearGradient>
                              </defs>
                              <rect width='900' height='900' fill='url(#g)'/>
                              <circle cx='450' cy='330' r='130' fill='rgba(255,255,255,0.22)'/>
                              <text x='450' y='520' text-anchor='middle' fill='#3d4a68' font-size='44' font-family='Georgia, serif'>Dream memory</text>
                            </svg>
                          `);
                      }}
                    />
                    <div className="ghibli-page-caption">
                      <span>{image.caption}</span>
                      <small>{image.date}</small>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ghibli-album-controls">
          <button
            type="button"
            className="ghibli-album-nav-button"
            onClick={() => turnPage("prev")}
            disabled={pageIndex === 0}
          >
            Previous
          </button>

          <span className="ghibli-album-page-indicator">
            Page {pageIndex + 1} / {totalPages}
          </span>

          <button
            type="button"
            className="ghibli-album-nav-button"
            onClick={() => turnPage("next")}
            disabled={pageIndex >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
