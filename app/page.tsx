"use client";

import type {
  FormEvent,
  ReactNode,
  SyntheticEvent,
} from "react";
import { motion, type Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";

import emailjs from "@emailjs/browser";
import { Cloud } from "lucide-react";

/* =========================================================
   THEME
=========================================================

   Primary Orange : #F97316
   Dark           : #0D0A08
   Dark Surface   : #15100D
   Cream          : #FFF7ED
   Hover Orange   : #EA580C

========================================================= */


/* =========================================================
   ANIMATIONS
========================================================= */

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const childReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SECTION COMPONENT
========================================================= */

function Section({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      className={`w-full px-4 sm:px-6 lg:px-0 ${className}`}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      {children}
    </motion.section>
  );
}


/* =========================================================
   SKILLS
========================================================= */

const skills = [
  {
    title: "Frontend",
    icon: "⌘",
    items: [
      "ReactJS",
      "JavaScript",
      "Tailwind",
      "HTML5",
      "CSS3",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    icon: "⌂",
    items: [
      "Node.js",
      "Django",
      "FastAPI",
      "Express",
      "Python",
    ],
  },
  {
    title: "Database",
    icon: "◉",
    items: [
      "MongoDB",
      "MySQL",
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "⚙",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
    ],
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
/* =======================================================
   PROJECT AUTO SLIDER
======================================================= */

useEffect(() => {
  const projectTimer = setInterval(() => {
    setActiveProject((prev) => (prev + 1) % 8);
  }, 5000);

  return () => {
    clearInterval(projectTimer);
  };
}, []);

/* =======================================================
   PORTFOLIO INTRO SHUTTER
======================================================= */

useEffect(() => {
  const timer = window.setTimeout(() => {
    setIntroVisible(false);
  }, 5300);

  return () => {
    window.clearTimeout(timer);
  };
}, []);
  /* =======================================================
   EMAILJS CONTACT FORM
======================================================= */

const contactForm = useRef<HTMLFormElement>(null);

const [contactSending, setContactSending] = useState(false);

const [contactStatus, setContactStatus] = useState<
  "success" | "error" | null
>(null);

const sendContactEmail = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  if (!contactForm.current) return;

  setContactSending(true);
  setContactStatus(null);

  const formData = new FormData(contactForm.current);

  const name = String(
    formData.get("name") ?? ""
  ).trim();

  const email = String(
    formData.get("email") ?? ""
  ).trim();

  const subject = String(
    formData.get("subject") ?? ""
  ).trim();

  const message = String(
    formData.get("message") ?? ""
  ).trim();

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: name,
        from_email: email,

        // These also populate {{name}} and {{email}}
        // if your EmailJS template uses those variables.
        name: name,
        email: email,

        subject: subject,
        message: message,
      },
      {
        publicKey:
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      }
    );

    setContactStatus("success");

    contactForm.current.reset();

    setTimeout(() => {
      setContactStatus(null);
    }, 5000);
  } catch (error) {
    console.error("EmailJS Error:", error);

    setContactStatus("error");
  } finally {
    setContactSending(false);
  }
};
  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  /* =======================================================
     SOUND
  ======================================================= */

  const toggleSound = () => {

    if (videoRef.current) {

      videoRef.current.muted = !isMuted;

      setIsMuted(!isMuted);

    }
  };
useEffect(() => {
  const video = videoRef.current;

  if (!video) return;

  const startFromBeginning = () => {
    video.currentTime = 0;

    video.play().catch(() => {
      // Browser may block autoplay until user interaction
    });
  };

  if (video.readyState >= 1) {
    startFromBeginning();
  } else {
    video.addEventListener("loadedmetadata", startFromBeginning, {
      once: true,
    });
  }

  return () => {
    video.removeEventListener("loadedmetadata", startFromBeginning);
  };
}, []);

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };


    return (

    <main className="min-h-screen w-full overflow-x-hidden bg-[#0D0A08] text-stone-900 selection:bg-orange-500 selection:text-white">


{/* =====================================================
    PORTFOLIO INTRO SHUTTER
===================================================== */}

{introVisible && (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: "-100%" }}
    transition={{
      delay: 1.5,
      duration: 3.8,
      ease: [0.76, 0, 0.24, 1],
    }}
    onAnimationComplete={() => setIntroVisible(false)}
    className="
      fixed
      inset-0
      z-[9999]
      flex
      items-center
      justify-center
      overflow-hidden
      bg-[#080503]
    "
  >
    {/* DIGITAL SHUTTER BACKGROUND */}

<div
  className="
    absolute
    inset-0
    bg-[#080503]
  "
/>

{/* Subtle orange center glow */}

<div
  className="
    pointer-events-none
    absolute
    inset-0
    bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_38%)]
  "
/>

    {/* DARK VIGNETTE */}

    <div
      className="
        pointer-events-none
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.14),transparent_42%)]
      "
    />

    {/* ORANGE TOP LIGHT */}

    <div
      className="
        absolute
        left-1/2
        top-0
        h-[2px]
        w-[55%]
        -translate-x-1/2
        bg-orange-500
        shadow-[0_0_25px_rgba(249,115,22,0.9)]
      "
    />

    {/* ORANGE SIDE LINES */}

    <div
      className="
        absolute
        left-0
        top-0
        h-full
        w-[2px]
        bg-gradient-to-b
        from-transparent
        via-orange-500
        to-transparent
        opacity-70
        shadow-[0_0_20px_rgba(249,115,22,0.6)]
      "
    />

    <div
      className="
        absolute
        right-0
        top-0
        h-full
        w-[2px]
        bg-gradient-to-b
        from-transparent
        via-orange-500
        to-transparent
        opacity-70
        shadow-[0_0_20px_rgba(249,115,22,0.6)]
      "
    />

    {/* CK BRANDING */}

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.82,
        y: 15,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
      "
    >
      {/* LOGO */}

      <div
        className="
          relative
          flex
          h-28
          w-28
          items-center
          justify-center

          sm:h-36
          sm:w-36

          md:h-44
          md:w-44
        "
      >
        {/* Orange glow */}

        <div
          className="
            absolute
            inset-3
            rounded-full
            bg-orange-500/20
            blur-2xl
          "
        />

        <img
          src="/assets/ck-logo.png"
          alt="CK - Chandra Kiran"
          className="
            relative
            z-10
            h-full
            w-full
            object-contain
            drop-shadow-[0_0_18px_rgba(249,115,22,0.8)]
            drop-shadow-[0_0_45px_rgba(249,115,22,0.35)]
          "
        />
      </div>

      {/* NAME */}

      <motion.div
        initial={{
          opacity: 0,
          letterSpacing: "0.2em",
        }}
        animate={{
          opacity: 1,
          letterSpacing: "0.42em",
        }}
        transition={{
          delay: 0.35,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="
          mt-5
          pl-[0.42em]
          text-center
          text-[15px]
          font-black
          uppercase
          text-white

          sm:text-lg

          md:text-xl
        "
      >
        CHANDRA KIRAN
      </motion.div>

      {/* ORANGE UNDERLINE */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: "90px",
          opacity: 1,
        }}
        transition={{
          delay: 0.65,
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          mt-4
          h-[2px]
          bg-orange-500
          shadow-[0_0_15px_rgba(249,115,22,0.9)]
        "
      />
    </motion.div>

    {/* BOTTOM SHUTTER GLOW */}

    <div
      className="
        absolute
        bottom-0
        left-1/2
        h-[2px]
        w-[70%]
        -translate-x-1/2
        bg-orange-500/70
        shadow-[0_0_30px_rgba(249,115,22,0.8)]
      "
    />
  </motion.div>
)}

<motion.header
  initial={{
    y: -30,
    opacity: 0,
  }}
  animate={{
    y: 0,
    opacity: 1,
  }}
  transition={{
    duration: 0.6,
  }}
  className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${
    isScrolled
      ? "border-b border-orange-500/20 bg-[#0D0A08]/95 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      : "border-b border-white/10 bg-transparent py-3"
  }`}
>
  <div className="relative flex w-full items-center justify-between px-4 sm:px-6 lg:px-10">

    {/* =================================================
        LOGO
    ================================================= */}

    <a
      href="#home"
      onClick={closeMobileMenu}
      aria-label="Chandra Kiran - Home"
      className="group flex shrink-0 items-center"
    >
      <div
        className="
          relative
          flex
          h-18
          w-18
          items-center
          justify-center
          overflow-hidden
          transition-all
          duration-300
          group-hover:scale-105
          sm:h-16
          sm:w-16
        "
      >
        <img
          src="/assets/ck-logo.png"
          alt="Chandra Kiran logo"
          className="
            h-full
            w-full
            object-contain
            p-1
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>
    </a>

    {/* =================================================
        DESKTOP NAVIGATION
        Hidden below 750px
    ================================================= */}

    <nav
      className="
        absolute
        left-1/2
        hidden
        -translate-x-1/2
        items-center
        gap-4
        lg:gap-6
        max-[850px]:gap-3
        min-[750px]:flex
      "
    >
      {[
        ["Home", "#home"],
        ["About", "#about"],
        ["Expertise", "#expertise"],
        ["Skills", "#skills"],
        ["Projects", "#projects"],
        ["Contact", "#contact"],
      ].map(([label, href]) => (
        <a
          key={label}
          href={href}
          className={`relative whitespace-nowrap text-xs font-semibold transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:text-orange-400 hover:after:w-full sm:text-sm ${
            isScrolled
              ? "text-white/80"
              : "text-white"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>

    {/* =================================================
        DESKTOP / TABLET RESUME BUTTON
    ================================================= */}

    <div className="hidden items-center gap-3 min-[750px]:flex">
      <a
        href="/assets/Chandra_Kiran_Chidurala.pdf"
        download="Chandra_Kiran_Chidurala.pdf"
        className="
          relative
          inline-flex
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-xl
          border
          border-orange-500/50
          bg-gradient-to-r
          from-orange-500
          to-amber-500
          px-4
          py-2.5
          text-xs
          font-black
          text-white
          shadow-[0_0_20px_rgba(249,115,22,0.3)]
          transition-all
          duration-300
          hover:scale-105
          hover:border-orange-400
          hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]
          sm:px-5
          sm:py-2.5
          sm:text-sm
        "
      >
        <span>Download Resume</span>
      </a>
    </div>

    {/* =================================================
        MOBILE MENU BUTTON
        Visible below 750px
    ================================================= */}

    <button
      onClick={() => setMobileMenu(!mobileMenu)}
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-orange-400/40
        bg-orange-500/10
        text-orange-400
        transition
        hover:bg-orange-500
        hover:text-white
        min-[750px]:hidden
      "
      aria-label="Toggle menu"
    >
      <span className="text-xl">
        {mobileMenu ? "×" : "☰"}
      </span>
    </button>
  </div>

  {/* =================================================
      MOBILE MENU
      Active below 750px
  ================================================= */}

  {mobileMenu && (
    <motion.div
      initial={{
        opacity: 0,
        height: 0,
      }}
      animate={{
        opacity: 1,
        height: "auto",
      }}
      className="
        border-t
        border-orange-500/20
        bg-[#0D0A08]/98
        px-4
        py-5
        backdrop-blur-xl
        min-[750px]:hidden
      "
    >
      <div className="flex flex-col gap-2">

        {/* MOBILE NAV LINKS */}

        {[
          ["Home", "#home"],
          ["About", "#about"],
          ["Expertise", "#expertise"],
          ["Skills", "#skills"],
          ["Projects", "#projects"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={closeMobileMenu}
            className="
              rounded-xl
              px-4
              py-3
              text-sm
              font-semibold
              text-white/80
              transition
              hover:bg-orange-500/10
              hover:text-orange-400
            "
          >
            {label}
          </a>
        ))}

        {/* =================================================
            MOBILE DOWNLOAD RESUME
        ================================================= */}

        <a
          href="/assets/Chandra_Kiran_Chidurala.pdf"
          download="Chandra_Kiran_Chidurala.pdf"
          onClick={closeMobileMenu}
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            px-4
            py-3
            text-center
            text-sm
            font-black
            text-white
            shadow-[0_0_20px_rgba(249,115,22,0.3)]
            transition
            hover:opacity-95
          "
        >
          <span>Download Resume</span>
        </a>

      </div>
    </motion.div>
  )}
</motion.header>
    


      {/* =====================================================
         HERO
         RESPONSIVE MOBILE + DESKTOP
      ===================================================== */}

      <section
        id="home"
        className="
          relative flex min-h-[100svh] w-full items-center
          overflow-hidden bg-[#0D0A08]
          pt-20 pb-8 sm:pt-24 sm:pb-12
        "
      >
        {/* ===================================================
            VIDEO
            NO OVERLAY
        =================================================== */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
         <video
  ref={videoRef}
  src="/assets/ck_orange.mp4"
  autoPlay
  muted={isMuted}
  loop
  playsInline
  preload="auto"
  disablePictureInPicture
  onContextMenu={(event: SyntheticEvent<HTMLVideoElement>) =>
    event.preventDefault()
  }
  className="
    absolute inset-0 h-full w-full
    scale-x-[-1]
    object-cover
    object-[78%_45%]
    max-[400px]:object-[42%_70%]
    max-[500px]:object-[52%_62%]
    max-[640px]:object-[75%_48%]
    min-[600px]:max-[850px]:object-[22%_center]
    md:object-[25%_center]
    lg:object-[88%_12%]
    brightness-100 contrast-100
  "
/>
        </div>

        {/* ===================================================
            SOUND BUTTON
        =================================================== */}

        <div
          className="
            absolute bottom-6 right-6 z-30
            flex flex-col items-center gap-1
            sm:bottom-8 sm:right-8
            md:right-8 md:top-28
          "
        >
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="
              flex h-11 w-11 cursor-pointer items-center justify-center
              rounded-full border border-white/20
              bg-black/60 text-white backdrop-blur-md
              transition-all duration-300
              hover:scale-110 hover:border-orange-400 hover:bg-orange-500
              hover:shadow-[0_0_30px_rgba(249,115,22,0.45)]
              sm:h-12 sm:w-12
            "
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72 4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </button>

          <span
            className="
              rounded-md border border-white/10 bg-black/60
              px-2 py-0.5 text-[9px] font-bold uppercase
              tracking-wider text-orange-300 backdrop-blur-md
            "
          >
            {isMuted ? "Mute" : "Sound On"}
          </span>

        </div>

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div
  className="
    relative z-10 w-full
    pl-15 pr-4 pt-12
    sm:pl-12 sm:pr-6 sm:pt-4
    md:pl-14 md:pr-8 md:pt-6
    lg:pl-20 lg:pr-0 lg:pt-0
    max-[400px]:pl-8
    max-[400px]:pt-16
  "
>
          <div className="grid w-full grid-cols-1 items-center lg:grid-cols-12">

            {/* HERO TEXT */}

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="
                w-full max-w-[320px]
                -translate-y-3
                min-[600px]:max-w-[380px]
                min-[750px]:max-w-[420px]
                sm:max-w-[460px] sm:-translate-y-4
                md:max-w-[500px] md:-translate-y-6
                lg:col-span-6 lg:max-w-[720px] lg:-translate-y-12
              "
            >
              
              <motion.h1
                variants={childReveal}
                className="
                  text-[34px] font-black leading-[0.96]
                  tracking-[-0.04em] text-white
                  drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]
                  min-[600px]:text-[40px]
                  sm:text-[46px] md:text-[52px] lg:text-7xl xl:text-8xl
                "
              >
                Hi, I&apos;m a

                <br />

                <span
                  className="
                    text-orange-500
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]
                  "
                >
                  Full Stack
                </span>

                <br />

                <span className="text-white">
                  Developer
                </span>
              </motion.h1>

              <motion.p
                variants={childReveal}
                className="
                  mt-3 max-w-[300px]
                  text-[12px] font-semibold leading-5 text-white
                  drop-shadow-[0_3px_8px_rgba(0,0,0,1)]
                  min-[600px]:max-w-[350px]
                  sm:mt-4 sm:max-w-[420px] sm:text-sm sm:leading-6
                  md:text-base md:max-w-[450px]
                  lg:text-lg lg:max-w-[560px]
                "
              >
                I build fast, scalable and modern web applications
                using React, Node.js and modern backend technologies.
              </motion.p>

              <motion.div
                variants={childReveal}
                className="
                  mt-4 flex flex-row items-center gap-3
                  sm:mt-5 sm:gap-3
                "
              >
                <a
                  href="#projects"
                  className="
                    inline-flex min-h-10 items-center justify-center
                    rounded-full bg-orange-500 px-4
                    text-xs font-black text-white
                    shadow-[0_10px_30px_rgba(249,115,22,0.28)]
                    transition-all duration-300
                    hover:-translate-y-1 hover:bg-orange-600
                    hover:shadow-[0_15px_40px_rgba(249,115,22,0.45)]
                    sm:px-6 sm:text-sm sm:min-h-11 lg:text-base lg:px-8
                  "
                >
                  View My Work
                </a>

                <a
                  href="#contact"
                  className="
                    inline-flex min-h-10 items-center justify-center
                    rounded-full border border-white/50
                    bg-black/20 px-4 text-xs font-black text-white
                    backdrop-blur-sm transition-all duration-300
                    hover:-translate-y-1 hover:border-orange-400
                    hover:bg-orange-500 hover:text-white
                    sm:px-6 sm:text-sm sm:min-h-11 lg:text-base lg:px-8
                  "
                >
                  Contact Me
                </a>
              </motion.div>

             <motion.div
  variants={childReveal}
  className="
    mt-4
    flex
    items-center
    gap-3
    pl-2
    sm:mt-5
  "
>
  {/* LinkedIn */}

  <a
    href="https://www.linkedin.com/in/chandrakiran-chidurala/"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    className="
      inline-flex
      h-10
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-white/30
      bg-black/25
      px-4
      text-xs
      font-bold
      text-white
      backdrop-blur-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-orange-400
      hover:bg-orange-500
      hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)]
      sm:h-11
      sm:px-5
      sm:text-sm
    "
  >
    <svg
      className="h-4 w-4 shrink-0 fill-current sm:h-5 sm:w-5"
      viewBox="0 0 24 24"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>

    
  </a>


  {/* GitHub */}

  <a
    href="https://github.com/Chckiran01"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
    className="
      inline-flex
      h-10
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-white/30
      bg-black/25
      px-4
      text-xs
      font-bold
      text-white
      backdrop-blur-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:border-orange-400
      hover:bg-orange-500
      hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)]
      sm:h-11
      sm:px-5
      sm:text-sm
    "
  >
    <svg
      className="h-4 w-4 shrink-0 fill-current sm:h-5 sm:w-5"
      viewBox="0 0 24 24"
    >
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>

    
  </a>
</motion.div>
            </motion.div>

            {/* VIDEO CHARACTER AREA */}

            <div className="hidden lg:col-span-6 lg:block" />

          </div>
        </div>

        

      </section>


{/* =====================================================
   ABOUT — ORANGE DEVELOPER IDENTITY SECTION
===================================================== */}

<Section
  id="about"
  className="
    relative
    w-full
    overflow-hidden
    border-t
    border-orange-500/10
    bg-[#0B0704]
    text-white
  "
>
  {/* ===================================================
      BACKGROUND DECORATION
  =================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Main orange ambient glow */}

    <div
      className="
        absolute
        left-[-15%]
        top-[20%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-orange-600/10
        blur-[140px]
      "
    />

    <div
      className="
        absolute
        right-[-15%]
        bottom-[-10%]
        h-[500px]
        w-[500px]
        rounded-full
        bg-orange-500/10
        blur-[150px]
      "
    />

    {/* Small decorative stars */}

    <span
      className="
        absolute
        left-[5%]
        top-[18%]
        text-4xl
        text-orange-500/50
      "
    >
      ✦
    </span>

    <span
      className="
        absolute
        right-[8%]
        top-[12%]
        text-5xl
        text-orange-500/60
      "
    >
      ✦
    </span>

    <span
      className="
        absolute
        bottom-[22%]
        left-[10%]
        text-3xl
        text-orange-500/40
      "
    >
      ✦
    </span>

    {/* Decorative dots */}

    <div
      className="
        absolute
        right-[8%]
        top-[42%]
        grid
        grid-cols-3
        gap-3
        opacity-40
      "
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="
            h-1
            w-1
            rounded-full
            bg-orange-500
          "
        />
      ))}
    </div>

  </div>


  {/* ===================================================
      MAIN CONTAINER

      FULL WIDTH
      ONLY CONTROLLED INTERNAL PADDING
  =================================================== */}

  <div
    className="
      relative
      z-10
      w-full
      px-5
      py-10

      sm:px-8
      sm:py-24

      md:px-10
      md:py-28

      lg:px-14
      lg:py-22

      xl:px-20
    "
  >

    {/* =================================================
        SECTION GRID
    ================================================= */}

    <div
      className="
        mx-auto
        grid
        w-full
        max-w-[1500px]
        items-center

        gap-14

        lg:grid-cols-[430px_minmax(0,1fr)]
        lg:gap-16

        xl:grid-cols-[470px_minmax(0,1fr)]
        xl:gap-20
      "
    >

      {/* =================================================
          LEFT — DEVELOPER ID CARD
      ================================================= */}

      <motion.div
        variants={childReveal}
        className="
          relative
          mx-auto
          w-full
          max-w-[430px]

          pt-8

          lg:mx-0
        "
      >
{/* =================================================
    TOP CABLE
    Extended to the top of the About section
================================================= */}

<div
  className="
    pointer-events-none
    absolute
    left-1/2
    top-[-5rem]
    z-10
    h-[7rem]
    w-[3px]
    -translate-x-1/2
    bg-gradient-to-b
    from-orange-500
    via-orange-400
    to-orange-500
    shadow-[0_0_10px_rgba(249,115,22,0.45)]
    
    sm:top-[-6rem]
    sm:h-[8rem]

    md:top-[-7rem]
    md:h-[9rem]

    lg:top-[-8rem]
    lg:h-[10rem]

    xl:top-[-9rem]
    xl:h-[11rem]
  "
/>

        {/* =================================================
            CABLE HOLDER
        ================================================= */}

        <div
          className="
            absolute
            left-1/2
            top-7
            z-30
            flex
            h-8
            w-20
            -translate-x-1/2
            items-center
            justify-center

            rounded-lg

            border
            border-stone-700

            bg-[#17120F]

            shadow-[0_8px_20px_rgba(0,0,0,0.6)]
          "
        >

          <div
            className="
              h-2
              w-8
              rounded-full
              bg-orange-500

              shadow-[0_0_12px_rgba(249,115,22,0.8)]
            "
          />

        </div>


        {/* =================================================
            CARD
        ================================================= */}

        <div
          className="
            relative
            overflow-hidden

            rounded-[2.5rem]

            border
            border-orange-500/40

            bg-[#110C09]

            p-4

            shadow-[0_20px_80px_rgba(249,115,22,0.12)]

            transition-all
            duration-500

            hover:border-orange-500/70
            hover:shadow-[0_25px_90px_rgba(249,115,22,0.2)]
          "
        >

          {/* Orange inner glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[2.5rem]
              bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.08),transparent_55%)]
            "
          />


          {/* =================================================
              IMAGE / VIDEO FRAME
          ================================================= */}

          <div
            className="
              relative
              h-[390px]
              w-full
              overflow-hidden

              rounded-[2rem]

              border
              border-orange-500/10

              bg-black

              sm:h-[430px]
            "
          >

            {/* Extended outer orange accent line */}
            <div className="absolute -left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-orange-500/80 to-transparent pointer-events-none hidden sm:block" />

            <img
              src="/assets/about-left.png"
             
              className="
                absolute
                inset-0
                h-full
                w-full

                scale-x-[-1]

                object-cover

                object-[78%_35%]

                transition-transform
                duration-700

                group-hover:scale-x-[-1]
              "
            />


            {/* Bottom image fade */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-40

                bg-gradient-to-t
                from-[#080604]
                via-[#080604]/60
                to-transparent
              "
            />

          </div>

        </div>

      </motion.div>


      {/* =================================================
          RIGHT — ABOUT CONTENT
      ================================================= */}

      <motion.div
        variants={stagger}
        className="
          flex
          min-w-0
          flex-col
          justify-center
        "
      >

        {/* =================================================
            SECTION LABEL
        ================================================= */}

        <motion.p
          variants={childReveal}
          className="
            mb-3

            text-[20px]
            font-black
            uppercase
            tracking-[0.35em]

            text-orange-500

            sm:text-xl
          "
        >
          ABOUT ME
        </motion.p>


        {/* =================================================
            TITLE
        ================================================= */}

        <motion.h2
          variants={childReveal}
          className="
            text-3xl
            font-black
            leading-[0.98]
            tracking-[-0.04em]

            text-white

            sm:text-4xl

            md:text-5xl

            lg:text-[3.6rem]

            xl:text-[4.2rem]
          "
        >

          Hello!

          <br />

          I&apos;m{" "}

          <span
            className="
              bg-gradient-to-r
              from-orange-400
              via-orange-500
              to-amber-400

              bg-clip-text

              text-transparent
            "
          >
            Chandra Kiran
          </span>

          

          <span className="text-white">
            {" "}Chidurala
          </span>

        </motion.h2>


        {/* =================================================
            INTRO
        ================================================= */}

        <motion.p
          variants={childReveal}
          className="
            mt-6
            max-w-[850px]

            text-base
            leading-7

            text-stone-300

            sm:text-lg
            sm:leading-8
          "
        >
          A passionate full-stack developer based in{" "}

          <strong
            className="
              font-bold
              text-orange-400
            "
          >
            Hyderabad, Telangana
          </strong>
          , dedicated to crafting clean, functional, and highly
          scalable web applications.
        </motion.p>


        {/* =================================================
            SECOND PARAGRAPH
        ================================================= */}

        <motion.p
          variants={childReveal}
          className="
            mt-6
            max-w-[850px]

            text-base
            leading-7

            text-stone-300

            sm:text-lg
            sm:leading-8
          "
        >
          My work combines frontend development, robust backend
          systems, databases, APIs, and modern cloud technologies
          to deliver seamless digital experiences.
        </motion.p>


        <motion.div
          variants={childReveal}
          className="
            mt-8

            grid
            grid-cols-2

            overflow-hidden

            rounded-2xl

            border
            border-orange-500/20

            bg-[#110C09]

            sm:grid-cols-4
          "
        >

          {/* Projects */}

          <div
            className="
              border-b
              border-orange-500/10
              p-4

              sm:border-b-0
              sm:border-r

              sm:p-5
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-orange-500/10

                  text-sm
                  font-black
                  text-orange-400
                "
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11z"/><path d="M12 22l5.5-9h-11z"/></svg>
              </span>

              <span
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                10+
              </span>

            </div>

            <p
              className="
                mt-2
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-stone-500
              "
            >
              Projects Built
            </p>

          </div>


          {/* Experience */}

          <div
            className="
              border-b
              border-orange-500/10
              p-4

              sm:border-b-0
              sm:border-r

              sm:p-5
            "
          >

            <div className="flex items-center gap-2">

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-orange-500/10

                  text-sm
                  text-orange-400
                "
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/></svg>
              </span>

              <span
                className="
                  text-2xl
                  font-black
                  text-white
                "
              >
                1+
              </span>

            </div>

            <p
              className="
                mt-2
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-stone-500
              "
            >
              Years Experience
            </p>

          </div>



          {/* Location */}

          <div
            className="
              p-4
              sm:p-5
            "
          >

            <div className="flex items-center gap-2">

              <span
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  bg-orange-500/10

                  text-sm
                  text-orange-400
                "
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </span>

              <span
                className="
                  text-lg
                  font-black
                  text-white
                "
              >
                Hyderabad
              </span>

            </div>

            <p
              className="
                mt-2
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-stone-500
              "
            >
              Location
            </p>

          </div>

        </motion.div>


        {/* =================================================
            ACTION BUTTONS
        ================================================= */}

        <motion.div
          variants={childReveal}
          className="
            mt-8
            flex
            flex-col
            gap-3

            sm:flex-row
            sm:items-center
            sm:gap-4
          "
        >

          {/* PRIMARY CTA */}

          <a
            href="#contact"
            className="
              inline-flex
              min-h-[52px]
              items-center
              justify-center

              rounded-xl

              bg-orange-500

              px-7

              text-sm
              font-black
              text-white

              shadow-[0_12px_35px_rgba(249,115,22,0.25)]

              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-orange-600

              hover:shadow-[0_18px_45px_rgba(249,115,22,0.4)]
            "
          >
            Let&apos;s Work Together
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>


          {/* RESUME */}

          <a
            href="/assets/Chandra_Kiran_Chidurala.pdf"
          download="Chandra_Kiran_Chidurala.pdf"
            className="
              inline-flex
              min-h-[52px]
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-orange-500/20

              bg-white/[0.02]

              px-6

              text-sm
              font-bold
              text-stone-300

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-500/60
              hover:bg-orange-500/10
              hover:text-orange-300
            "
          >

            

            Download Resume

          </a>

        </motion.div>

      </motion.div>

    </div>

  </div>


  {/* ===================================================
      BOTTOM ORANGE WAVE
  =================================================== */}

  <div
    className="
      pointer-events-none
      absolute
      bottom-0
      left-0
      h-30
      w-full
      overflow-hidden
    "
  >

    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="
        absolute
        bottom-[-1px]
        h-full
        w-full
      "
    >

      <path
        d="
          M0,65
          C220,115 390,115 600,78
          C850,35 1030,25 1230,52
          C1320,65 1380,75 1440,60
          L1440,120
          L0,120
          Z
        "
        fill="#F97316"
        fillOpacity="0.14"
      />

    </svg>

  </div>

</Section>
     
{/* =====================================================
    EXPERTISE — CODE & AI ROADMAP
===================================================== */}

<Section
  id="expertise"
  className="relative w-full overflow-hidden border-t border-orange-500/10 bg-[#080503] text-white"
>
  {/* =====================================================
      BACKGROUND
  ===================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Grid */}

    <div
      className="absolute inset-0 opacity-[0.12]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(249,115,22,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.20) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />

    {/* Glows */}

    <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-600/20 blur-[140px]" />

    <div className="absolute bottom-[-260px] left-[10%] h-[560px] w-[560px] rounded-full bg-orange-600/20 blur-[150px]" />

    <div className="absolute bottom-[-250px] right-[-170px] h-[560px] w-[560px] rounded-full bg-orange-500/20 blur-[150px]" />

    {/* Right dots */}

    <div className="absolute right-[7%] top-[28%] grid grid-cols-4 gap-x-6 gap-y-5 opacity-70">
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[5px] rounded-full bg-orange-500"
        />
      ))}
    </div>

    {/* Bottom-left dots */}

    <div className="absolute bottom-[13%] left-[3.5%] grid grid-cols-5 gap-x-6 gap-y-5 opacity-70">
      {Array.from({ length: 15 }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[5px] rounded-full bg-orange-500"
        />
      ))}
    </div>

  </div>


  {/* =====================================================
      MAIN CONTENT
  ===================================================== */}

  <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-16 xl:px-16">


    {/* =====================================================
        TABLET + DESKTOP ROADMAP
        768px+
    ===================================================== */}

    <div className="relative hidden min-h-[700px] w-full md:block lg:min-h-[760px] xl:min-h-[820px]">


      {/* ===================================================
          LEFT CONTENT
      =================================================== */}

      <motion.div
        variants={stagger}
        className="absolute left-[3%] top-[8%] z-30 w-[34%] max-w-[480px]"
      >

        {/* Badge */}

        <motion.div
          variants={childReveal}
          className="mb-4 inline-flex items-center gap-3 rounded-full border border-orange-500 bg-orange-500/5 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-orange-400 sm:text-lg"
        >
          <span className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.9)]" />

          MY EXPERTISE
        </motion.div>


        {/* Heading */}

        <motion.h2
          variants={childReveal}
          className="text-[clamp(2.2rem,4.2vw,4.6rem)] font-black leading-[0.93] tracking-[-0.055em] text-white"
        >
          Building
          <br />
          Modern Digital
          <br />
          Solutions with
          <br />

          <span className="text-orange-500">
            Code &amp; AI
          </span>
        </motion.h2>


        {/* Description */}

        <motion.p
          variants={childReveal}
          className="mt-5 max-w-[440px] text-sm leading-6 text-stone-300 xl:text-base xl:leading-7"
        >
          I combine frontend development, backend engineering,
          databases and modern tools with AI to build{" "}
          <span className="font-black text-orange-500">
            faster, more robust and scalable web applications.
          </span>
        </motion.p>


        {/* CTA */}

        <motion.a
          variants={childReveal}
          href="#contact"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full border-2 border-orange-500 bg-orange-500/10 px-6 text-xs font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.35)] sm:px-7 sm:text-sm"
        >
          Let's Work Together

          <span className="text-lg text-orange-400">
            →
          </span>
        </motion.a>

      </motion.div>


      {/* ===================================================
          ROADMAP
      =================================================== */}

      <div className="absolute right-0 top-0 h-full w-[62%]">


        {/* =================================================
            SVG CONNECTIONS
        ================================================= */}

        <svg
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
          viewBox="0 0 1000 820"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >

          {/* 01 → 02 */}

          <motion.path
            d="M 785 128 C 700 150 630 240 520 285 C 430 322 340 340 245 349"
            stroke="#F97316"
            strokeWidth="3"
            strokeDasharray="7 10"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            whileInView={{
              pathLength: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          />


          {/* 02 → 03 */}

          <motion.path
            d="M 245 349 C 350 355 400 405 500 435 C 600 465 690 515 785 538"
            stroke="#F97316"
            strokeWidth="3"
            strokeDasharray="7 10"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            whileInView={{
              pathLength: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              delay: 0.25,
              ease: "easeInOut",
            }}
          />


          {/* 03 → 04 */}

          <motion.path
            d="M 785 538 C 690 555 620 610 520 650 C 420 690 330 705 245 710"
            stroke="#F97316"
            strokeWidth="3"
            strokeDasharray="7 10"
            strokeLinecap="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            whileInView={{
              pathLength: 1,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              ease: "easeInOut",
            }}
          />


          {/* Checkpoint 01 */}

          <motion.g
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              type: "spring",
            }}
          >
            <circle
              cx="785"
              cy="128"
              r="18"
              fill="#080503"
              stroke="#F97316"
              strokeWidth="5"
            />

            <circle
              cx="785"
              cy="128"
              r="8"
              fill="#F97316"
            />

            <circle
              cx="785"
              cy="128"
              r="4"
              fill="#FDBA74"
            />
          </motion.g>


          {/* Checkpoint 02 */}

          <motion.g
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.45,
              duration: 0.4,
              type: "spring",
            }}
          >
            <circle
              cx="245"
              cy="349"
              r="18"
              fill="#080503"
              stroke="#F97316"
              strokeWidth="5"
            />

            <circle
              cx="245"
              cy="349"
              r="8"
              fill="#F97316"
            />

            <circle
              cx="245"
              cy="349"
              r="4"
              fill="#FDBA74"
            />
          </motion.g>


          {/* Checkpoint 03 */}

          <motion.g
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.7,
              duration: 0.4,
              type: "spring",
            }}
          >
            <circle
              cx="785"
              cy="538"
              r="18"
              fill="#080503"
              stroke="#F97316"
              strokeWidth="5"
            />

            <circle
              cx="785"
              cy="538"
              r="8"
              fill="#F97316"
            />

            <circle
              cx="785"
              cy="538"
              r="4"
              fill="#FDBA74"
            />
          </motion.g>


          {/* Checkpoint 04 */}

          <motion.g
            initial={{
              opacity: 0,
              scale: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.95,
              duration: 0.4,
              type: "spring",
            }}
          >
            <circle
              cx="245"
              cy="710"
              r="18"
              fill="#080503"
              stroke="#F97316"
              strokeWidth="5"
            />

            <circle
              cx="245"
              cy="710"
              r="8"
              fill="#F97316"
            />

            <circle
              cx="245"
              cy="710"
              r="4"
              fill="#FDBA74"
            />
          </motion.g>

        </svg>


        {/* =================================================
            CARD 01
        ================================================= */}

        <motion.article
          initial={{
            opacity: 0,
            y: 25,
            rotate: 6,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: 6,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay: 0.15,
          }}
          className="absolute right-[7%] top-[0%] z-30 h-[215px] w-[245px] overflow-hidden rounded-[1.5rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-5 shadow-[0_25px_75px_rgba(249,115,22,0.22)] md:h-[225px] md:w-[250px] lg:h-[235px] lg:w-[270px] xl:h-[255px] xl:w-[290px]"
        >

          <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

          <div className="absolute right-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-cyan-400 md:h-12 md:w-12">

            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8"
              fill="none"
            >
              <circle
                cx="32"
                cy="32"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <ellipse
                cx="32"
                cy="32"
                rx="27"
                ry="10"
                stroke="currentColor"
                strokeWidth="3"
                transform="rotate(60 32 32)"
              />

              <ellipse
                cx="32"
                cy="32"
                rx="27"
                ry="10"
                stroke="currentColor"
                strokeWidth="3"
                transform="rotate(-60 32 32)"
              />

              <circle
                cx="32"
                cy="32"
                r="4"
                fill="currentColor"
              />
            </svg>

          </div>

          <p className="mt-3 text-xs font-black text-orange-500">
            01
          </p>

          <h3 className="mt-2 max-w-[72%] text-[1.2rem] font-black leading-[1.02] tracking-[-0.035em] text-white lg:text-[1.3rem] xl:text-[1.45rem]">
            Frontend
            <br />
            Development
          </h3>

          <p className="mt-3 pt-5  max-w-[92%] text-[11px] leading-5 text-stone-200 lg:text-[1rem]">
            Crafting responsive and modern user interfaces using React and modern frontend technologies.
          </p>

        </motion.article>


        {/* =================================================
            CARD 02
        ================================================= */}

        <motion.article
          initial={{
            opacity: 0,
            y: 25,
            rotate: -7,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: -7,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay: 0.3,
          }}
          className="absolute left-[10%] top-[27%] z-30 h-[215px] w-[245px] overflow-hidden rounded-[1.5rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-5 shadow-[0_25px_75px_rgba(249,115,22,0.22)] md:h-[225px] md:w-[250px] lg:h-[235px] lg:w-[270px] xl:h-[255px] xl:w-[290px]"
        >

          <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

          <div className="absolute right-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-orange-500 md:h-12 md:w-12">

            <span className="text-2xl font-black tracking-[-0.12em]">
              JS
            </span>

          </div>

          <p className="mt-3 text-xs font-black text-orange-500">
            02
          </p>

          <h3 className="mt-2 max-w-[72%] text-[1.2rem] font-black leading-[1.02] tracking-[-0.035em] text-white lg:text-[1.3rem] xl:text-[1.45rem]">
            Backend
            <br />
            Development
          </h3>

          <p className="mt-3 pt-5 max-w-[94%] text-[11px] leading-5 text-stone-200 lg:text-[1rem]">
            Building secure and scalable server-side applications, REST APIs and authentication systems.
          </p>

        </motion.article>


        {/* =================================================
            CARD 03

            TABLET:
            54%

            DESKTOP:
            50%
        ================================================= */}

        <motion.article
          initial={{
            opacity: 0,
            y: 25,
            rotate: 6,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: 6,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay: 0.45,
          }}
          className="absolute right-[7%] top-[54%] z-30 h-[215px] w-[250px] overflow-hidden rounded-[1.5rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-5 shadow-[0_25px_75px_rgba(249,115,22,0.22)] md:h-[225px] md:w-[255px] lg:top-[50%] lg:h-[235px] lg:w-[275px] xl:h-[255px] xl:w-[295px]"
        >

          <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

          <div className="absolute right-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-orange-300 md:h-12 md:w-12">

            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8"
              fill="none"
            >

              <ellipse
                cx="32"
                cy="16"
                rx="20"
                ry="8"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                d="M12 16v15c0 5 9 9 20 9s20-4 20-9V16"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                d="M12 31v15c0 5 9 9 20 9s20-4 20-9V31"
                stroke="currentColor"
                strokeWidth="4"
              />

            </svg>

          </div>

          <p className="mt-3 text-xs font-black text-orange-500">
            03
          </p>

          <h3 className="mt-2 max-w-[74%] text-[1.2rem] font-black leading-[1.02] tracking-[-0.035em] text-white lg:text-[1.3rem] xl:text-[1.45rem]">
            Database
            <br />
            Management
          </h3>

          <p className="mt-3 pt-5 max-w-[94%] text-[11px] leading-5 text-stone-200 lg:text-[1rem]">
            Designing and working with structured and document-based data systems.
          </p>

        </motion.article>


        {/* =================================================
            CARD 04

            TABLET:
            76%

            DESKTOP:
            72%
        ================================================= */}

        <motion.article
          initial={{
            opacity: 0,
            y: 25,
            rotate: -7,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            rotate: -7,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay: 0.6,
          }}
          className="absolute left-[10%] top-[80%] z-30 h-[205px] w-[240px] overflow-hidden rounded-[1.5rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-5 shadow-[0_25px_75px_rgba(249,115,22,0.22)] md:h-[210px] md:w-[250px] lg:top-[72%] lg:h-[220px] lg:w-[265px] xl:h-[240px] xl:w-[285px]"
        >

          <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

          <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

          <div className="absolute right-4 top-6 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-purple-400 md:h-12 md:w-12">

            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8"
              fill="none"
            >

              <path
                d="M17 43l12-12 7 7-12 12-10 3 3-10Z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <path
                d="M38 14l4 4 4-4 4 4-4 4 4 4-4 4-4-4-4 4-4-4 4-4-4-4 4-4Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinejoin="round"
              />

            </svg>

          </div>

          <p className="mt-3 text-xs font-black text-orange-500">
            04
          </p>

          <h3 className="mt-2 max-w-[78%] text-[1.15rem] font-black leading-[1.02] tracking-[-0.035em] text-white lg:text-[1.25rem] xl:text-[1.4rem]">
            Tools &amp; AI Integration
          </h3>

          <p className="mt-3 pt-5 max-w-[94%] text-[11px] leading-5 text-stone-200 lg:text-[1rem]">
            Using modern development tools and AI to build faster, more robust and scalable applications.
          </p>

        </motion.article>

      </div>
    </div>


    {/* =====================================================
        MOBILE — TILTED CARDS
        BELOW 768px
    ===================================================== */}

    <div className="block md:hidden">

      <motion.div
        variants={stagger}
        className="mx-auto w-full max-w-[520px]"
      >

        {/* Mobile heading */}

        <motion.div
          variants={childReveal}
          className="mb-12"
        >

          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-orange-500 bg-orange-500/5 px-4 py-2 text-xs font-black uppercase tracking-wide text-orange-400">

            <span className="h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.9)]" />

            MY EXPERTISE

          </div>


          <h2 className="text-[clamp(2.5rem,10vw,4.2rem)] font-black leading-[0.94] tracking-[-0.055em] text-white">

            Building
            <br />

            Modern Digital
            <br />

            Solutions with
            <br />

            <span className="text-orange-500">
              Code &amp; AI
            </span>

          </h2>


          <p className="mt-6 max-w-xl text-sm leading-7 text-stone-300 sm:text-lg">
            I combine frontend development, backend engineering,
            databases and modern tools with AI to build{" "}
            <span className="font-black text-orange-500">
              faster, more robust and scalable web applications.
            </span>
          </p>


          <a
            href="#contact"
            className="mt-6 inline-flex min-h-[48px] items-center gap-3 rounded-full border-2 border-orange-500 bg-orange-500/10 px-6 text-sm font-black text-white transition-all hover:bg-orange-500"
          >
            Let's Work Together

            <span className="text-lg text-orange-400">
              →
            </span>
          </a>

        </motion.div>


        {/* =================================================
            TILTED MOBILE CARDS
        ================================================= */}

        <div className="flex flex-col items-center gap-10 sm:gap-12">


          {/* Card 01 */}

          <motion.article
            variants={childReveal}
            className="-rotate-[3deg] relative min-h-[235px] w-[calc(100%-16px)] max-w-[380px] overflow-hidden rounded-[1.6rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-6 shadow-[0_20px_60px_rgba(249,115,22,0.18)] transition-transform duration-300 hover:rotate-0 min-[401px]:min-h-[255px] min-[401px]:p-7"
          >

            <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

            <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

            <p className="mt-3 text-xs font-black text-orange-500">
              01
            </p>

            <h3 className="mt-3 max-w-[82%] text-xl font-black leading-[1.02] tracking-[-0.03em] text-white min-[401px]:text-2xl">
              Frontend
              <br />
              Development
            </h3>

            <p className="mt-4 max-w-[95%] text-xs leading-5 text-stone-300 min-[401px]:text-sm min-[401px]:leading-6">
              Crafting responsive and modern user interfaces using React and modern frontend technologies.
            </p>

          </motion.article>


          {/* Card 02 */}

          <motion.article
            variants={childReveal}
            className="rotate-[3deg] relative min-h-[235px] w-[calc(100%-16px)] max-w-[380px] overflow-hidden rounded-[1.6rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-6 shadow-[0_20px_60px_rgba(249,115,22,0.18)] transition-transform duration-300 hover:rotate-0 min-[401px]:min-h-[255px] min-[401px]:p-7"
          >

            <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

            <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

            <p className="mt-3 text-xs font-black text-orange-500">
              02
            </p>

            <h3 className="mt-3 max-w-[82%] text-xl font-black leading-[1.02] tracking-[-0.03em] text-white min-[401px]:text-2xl">
              Backend
              <br />
              Development
            </h3>

            <p className="mt-4 max-w-[95%] text-xs leading-5 text-stone-300 min-[401px]:text-sm min-[401px]:leading-6">
              Building secure and scalable server-side applications, REST APIs and authentication systems.
            </p>

          </motion.article>


          {/* Card 03 */}

          <motion.article
            variants={childReveal}
            className="-rotate-[2.5deg] relative min-h-[235px] w-[calc(100%-16px)] max-w-[380px] overflow-hidden rounded-[1.6rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-6 shadow-[0_20px_60px_rgba(249,115,22,0.18)] transition-transform duration-300 hover:rotate-0 min-[401px]:min-h-[255px] min-[401px]:p-7"
          >

            <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

            <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

            <p className="mt-3 text-xs font-black text-orange-500">
              03
            </p>

            <h3 className="mt-3 max-w-[82%] text-xl font-black leading-[1.02] tracking-[-0.03em] text-white min-[401px]:text-2xl">
              Database
              <br />
              Management
            </h3>

            <p className="mt-4 max-w-[95%] text-xs leading-5 text-stone-300 min-[401px]:text-sm min-[401px]:leading-6">
              Designing and working with structured and document-based data systems.
            </p>

          </motion.article>


          {/* Card 04 */}

          <motion.article
            variants={childReveal}
            className="rotate-[2.5deg] relative min-h-[235px] w-[calc(100%-16px)] max-w-[380px] overflow-hidden rounded-[1.6rem] border-2 border-orange-500 bg-gradient-to-br from-[#2b1406] via-[#130A06] to-[#090604] p-6 shadow-[0_20px_60px_rgba(249,115,22,0.18)] transition-transform duration-300 hover:rotate-0 min-[401px]:min-h-[255px] min-[401px]:p-7"
          >

            <div className="absolute inset-x-0 top-0 h-2.5 bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.8)]" />

            <div className="absolute left-1/2 top-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#090604] bg-stone-300" />

            <p className="mt-3 text-xs font-black text-orange-500">
              04
            </p>

            <h3 className="mt-3 max-w-[82%] text-xl font-black leading-[1.02] tracking-[-0.03em] text-white min-[401px]:text-2xl">
              Tools &amp; AI Integration
            </h3>

            <p className="mt-4 max-w-[95%] text-xs leading-5 text-stone-300 min-[401px]:text-sm min-[401px]:leading-6">
              Using modern development tools and AI to build faster, more robust and scalable applications.
            </p>

          </motion.article>

        </div>

      </motion.div>

    </div>

  </div>

</Section>




{/* =================================================
    PROJECTS
================================================= */}

<Section
  id="projects"
  className="relative w-full overflow-hidden bg-[#080503] text-white"
>
  {/* =================================================
      BACKGROUND
  ================================================= */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    <div
      className="absolute inset-0 opacity-[0.10]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(249,115,22,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.18) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />

    <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[150px]" />

    <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[150px]" />

    <div className="absolute bottom-[-220px] left-[20%] h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-[150px]" />

    <div className="absolute bottom-[-180px] right-[-150px] h-[450px] w-[450px] rounded-full bg-orange-500/20 blur-[150px]" />

    <div className="absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full border border-orange-500/20" />

    <div className="absolute -bottom-36 -right-36 h-[450px] w-[450px] rounded-full border border-orange-500/20" />

    <div className="absolute right-[5%] top-[10%] grid grid-cols-4 gap-x-6 gap-y-5 opacity-70">
      {Array.from({ length: 20 }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[5px] rounded-full bg-orange-500"
        />
      ))}
    </div>

    <div className="absolute bottom-[8%] left-[3%] grid grid-cols-5 gap-x-6 gap-y-5 opacity-60">
      {Array.from({ length: 20 }).map((_, index) => (
        <span
          key={index}
          className="h-[5px] w-[5px] rounded-full bg-orange-500"
        />
      ))}
    </div>

  </div>


  {/* =================================================
      CONTENT
  ================================================= */}

  <div
    className="
      relative
      z-10
      mx-auto
      w-full
      max-w-[1500px]
      px-5
      py-8
      sm:px-8
      sm:py-10
      md:px-10
      lg:px-12
      xl:px-16
    "
  >

    {/* =================================================
        MAIN HEADING
    ================================================= */}

    <motion.div
      variants={stagger}
      className="mx-auto mb-12 max-w-4xl text-center"
    >

      <motion.div
        variants={childReveal}
        className="
          mx-auto
          mb-4
          inline-flex
          items-center
          gap-3
          rounded-full
          border
          border-orange-500/70
          bg-orange-500/[0.06]
          px-4
          py-1.5
          text-[10px]
          font-black
          uppercase
          tracking-[0.18em]
          text-orange-400
          sm:text-xl
        "
      >
        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-orange-500
            shadow-[0_0_15px_rgba(249,115,22,0.95)]
          "
        />

        MY PROJECTS
      </motion.div>


      <motion.p
        variants={childReveal}
        className="
          mx-auto
          mt-4
          max-w-2xl
          text-xs
          leading-6
          text-stone-300
          sm:text-sm
          sm:leading-7
          lg:text-base
        "
      >
        A collection of client work and personal projects that showcase my
        experience in modern web development, full-stack applications and
        responsive digital experiences.
      </motion.p>

    </motion.div>


    {/* =================================================
        PROJECT SHOWCASE
    ================================================= */}

    {(() => {

      const projects = [
        {
          title: "Move Physio Care",
          type: "Client Project",
          description:
            "A professional physiotherapy and rehabilitation website designed to present services, treatments and patient-focused care.",
          technologies: ["HTML", "JavaScript", "PHP", "CSS"],
          link: "https://movephysiocare.com/",
          image: "/assets/move.png",
        },

        {
          title: "SPARC Physio",
          type: "Client Project",
          description:
            "A modern physiotherapy and rehabilitation website with service-focused pages and responsive layouts.",
          technologies: ["HTML", "JavaScript", "PHP", "CSS"],
          link: "https://www.sparcphysio.com.in/",
          image: "/assets/sparc.png",
        },

        {
          title: "Speech & Hearing Specialist",
          type: "Client Project",
          description:
            "A professional healthcare website designed to present speech and hearing related services in a clear digital experience.",
          technologies: ["HTML", "JavaScript", "PHP", "CSS"],
          link: "https://speechandhearingspecialist.com/",
          image: "/assets/ab.png",
        },

        {
          title: "CM Dental",
          type: "Client Project",
          description:
            "A responsive dental clinic website focused on presenting treatments, services and appointment information.",
          technologies: ["HTML", "JavaScript", "PHP", "CSS"],
          link: "https://cmdental.in/",
          image: "/assets/cm.png",
        },

        {
          title: "Whiteberry Dental",
          type: "Client Project",
          description:
            "A responsive dental clinic website focused on presenting treatments, services and appointment information.",
          technologies: ["HTML", "JavaScript", "PHP", "CSS"],
          link: "https://cmdental.in/",
          image: "/assets/whiteberry.png",
        },

        {
          title: "Restaurant Management System",
          type: "Personal Project",
          description:
            "A restaurant management application designed to manage restaurant operations through a modern web interface.",
          technologies: ["React", "JavaScript", "Web App"],
          link: "https://restaurant-management-system-rhjwum7ct-chckiran01s-projects.vercel.app/",
          image: "/assets/vibe.png",
        },

        {
          title: "Enlite",
          type: "Personal Project",
          description:
            "A modern web project created as part of my personal development and experimentation work.",
          technologies: ["React", "JavaScript", "Vercel"],
          link: "https://enlite-new-project-w3ks.vercel.app/",
          image: "/assets/enlite.png",
        },

        {
          title: "Memory Card Game",
          type: "Personal Project",
          description:
            "An interactive memory card game focused on responsive UI, game logic and user interaction.",
          technologies: ["React", "JavaScript", "Game UI"],
          link: "https://memory-card-game-gilt-kappa.vercel.app/",
          image: "/assets/game.png",
        },
      ];


      const active = projects[activeProject];


      return (
        <div className="relative">

          {/* =================================================
              LARGE + SMALL PROJECT LAYOUT
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-4
              lg:grid-cols-[minmax(0,1.45fr)_minmax(420px,0.9fr)]
            "
          >

            {/* =================================================
                LARGE ACTIVE PROJECT
            ================================================= */}

            <motion.article
              key={active.title}
              initial={{
                opacity: 0,
                x: -30,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              className="
                group
                relative
                min-h-[600px]
                overflow-hidden
                rounded-[1.7rem]
                border-2
                border-orange-500
                bg-gradient-to-br
                from-[#2b1205]
                via-[#140906]
                to-[#080503]
                p-4
                shadow-[0_25px_80px_rgba(249,115,22,0.18)]
                sm:p-5
                lg:p-5
              "
            >

              {/* TOP ORANGE LINE */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-1
                  bg-orange-500
                  shadow-[0_0_25px_rgba(249,115,22,0.95)]
                "
              />


              {/* =================================================
                  HEADER
              ================================================= */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-orange-400/50
                    bg-black/50
                    px-3
                    py-1.5
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-orange-300
                    backdrop-blur-xl
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-orange-500
                      shadow-[0_0_10px_rgba(249,115,22,1)]
                    "
                  />

                  FEATURED PROJECT
                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    font-black
                    text-stone-400
                  "
                >

                  <span className="text-orange-400">
                    {String(activeProject + 1).padStart(2, "0")}
                  </span>

                  <span>
                    / {String(projects.length).padStart(2, "0")}
                  </span>


                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveProject(
                        (activeProject - 1 + projects.length) %
                          projects.length
                      )
                    }
                    className="
                      ml-1.5
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-orange-500/40
                      bg-black/40
                      text-orange-300
                      transition-all
                      duration-300
                      hover:border-orange-500
                      hover:bg-orange-500
                      hover:text-white
                    "
                    aria-label="Previous project"
                  >
                    ←
                  </button>


                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveProject(
                        (activeProject + 1) % projects.length
                      )
                    }
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-orange-500/40
                      bg-black/40
                      text-orange-300
                      transition-all
                      duration-300
                      hover:border-orange-500
                      hover:bg-orange-500
                      hover:text-white
                    "
                    aria-label="Next project"
                  >
                    →
                  </button>

                </div>

              </div>


              {/* =================================================
                  PROJECT IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[1.3rem]
                  border
                  border-orange-400/40
                  bg-[#090909]
                  shadow-[0_15px_50px_rgba(0,0,0,0.4)]
                "
              >

                <div
                  className="
                    relative
                    aspect-[16/8.5]
                    overflow-hidden
                  "
                >

                  <motion.img
                    key={`${active.title}-image`}
                    initial={{
                      scale: 1.05,
                      opacity: 0.5,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    src={active.image}
                    alt={`${active.title} project preview`}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                      transition-transform
                      duration-700
                      group-hover:scale-[1.02]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#080503]/75
                      via-transparent
                      to-transparent
                    "
                  />

                </div>


                {/* TYPE BADGE */}

                <div
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    border
                    border-orange-400/50
                    bg-black/70
                    px-2.5
                    py-1
                    text-[9px]
                    font-black
                    uppercase
                    tracking-wider
                    text-orange-300
                    backdrop-blur-md
                  "
                >
                  {active.type}
                </div>

              </div>


              {/* =================================================
                  ACTIVE PROJECT CONTENT
              ================================================= */}

              <motion.div
                key={`${active.title}-content`}
                initial={{
                  opacity: 0,
                  y: 14,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.06,
                }}
                className="pt-5"
              >

                {/* TITLE */}

                <div
                  className="
                    flex
                    flex-col
                    gap-2.5
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-black
                      tracking-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    {active.title}
                  </h3>


                  <span
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-orange-500/60
                      bg-orange-500/5
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-orange-300
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                    {active.type}
                  </span>

                </div>


                {/* DESCRIPTION */}

                <p
                  className="
                    mt-3
                    max-w-3xl
                    text-sm
                    leading-7
                    text-stone-300
                    sm:text-[15px]
                  "
                >
                  {active.description}
                </p>


                {/* =================================================
                    TECHNOLOGIES
                ================================================= */}

                <div className="mt-5">

                  <p
                    className="
                      mb-2.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-stone-500
                    "
                  >
                    Technologies
                  </p>


                  <div className="flex flex-wrap gap-1.5">

                    {active.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="
                          rounded-lg
                          border
                          border-white/10
                          bg-white/[0.04]
                          px-2.5
                          py-1.5
                          text-[10px]
                          font-bold
                          text-stone-300
                          transition-all
                          duration-300
                          hover:border-orange-500/50
                          hover:bg-orange-500/10
                          hover:text-orange-300
                        "
                      >
                        {technology}
                      </span>
                    ))}

                  </div>

                </div>


                {/* =================================================
                    LIVE DEMO — FULL WIDTH
                ================================================= */}

                <div className="mt-6 w-full">

                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group/live
                      inline-flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2.5
                      rounded-xl
                      border-2
                      border-orange-500
                      bg-orange-500
                      px-5
                      text-xs
                      font-black
                      text-white
                      transition-all
                      duration-300
                      hover:bg-orange-600
                      hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]
                    "
                  >

                    <span>
                      Live Demo
                    </span>

                    

                  </a>

                </div>

              </motion.div>

            </motion.article>


            {/* =================================================
                SMALL PROJECT CARDS
            ================================================= */}

            <div
              className="
                hidden
                grid-cols-1
                gap-3
                sm:grid-cols-2
                lg:grid
                lg:grid-cols-2
                lg:auto-rows-fr
              "
            >

              {projects.map((project, index) => {

                if (index === activeProject) return null;

                return (
                  <motion.button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProject(index)}
                    initial={{
                      opacity: 0,
                      y: 16,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: Math.min(index * 0.04, 0.3),
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    className="
                      group
                      relative
                      flex
                      min-h-[155px]
                      overflow-hidden
                      rounded-[1.15rem]
                      border
                      border-orange-500/25
                      bg-gradient-to-br
                      from-[#1c0d06]
                      via-[#100806]
                      to-[#080503]
                      p-2.5
                      text-left
                      shadow-[0_12px_35px_rgba(249,115,22,0.05)]
                      transition-all
                      duration-300
                      hover:border-orange-500/70
                      hover:shadow-[0_18px_45px_rgba(249,115,22,0.14)]
                    "
                  >

                    <div className="flex min-h-[135px] w-full gap-3">

                      {/* =================================================
                          FULL HEIGHT IMAGE
                      ================================================= */}

                      <div
                        className="
                          relative
                          min-h-[135px]
                          w-[42%]
                          shrink-0
                          overflow-hidden
                          rounded-lg
                          border
                          border-orange-500/20
                          bg-[#090909]
                        "
                      >

                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-110
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-transparent
                            via-transparent
                            to-black/35
                          "
                        />

                      </div>


                      {/* =================================================
                          PROJECT INFO
                      ================================================= */}

                      <div
                        className="
                          flex
                          min-w-0
                          flex-1
                          flex-col
                          justify-between
                          py-1
                        "
                      >

                        {/* TOP */}

                        <div>

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-2
                            "
                          >

                            <span
                              className="
                                text-[10px]
                                font-black
                                text-stone-500
                              "
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>


                            <span
                              className="
                                flex
                                h-7
                                w-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-orange-500/40
                                text-xs
                                text-orange-400
                                transition-all
                                duration-300
                                group-hover:border-orange-500
                                group-hover:bg-orange-500
                                group-hover:text-white
                              "
                            >
                              →
                            </span>

                          </div>


                          <h4
                            className="
                              mt-2
                              line-clamp-3
                              text-sm
                              font-black
                              leading-tight
                              text-white
                              sm:text-[15px]
                            "
                          >
                            {project.title}
                          </h4>

                        </div>


                        {/* BOTTOM */}

                        <div>

                          {/* PROJECT TYPE */}

                          <div
                            className="
                              mb-2
                              flex
                              items-center
                              gap-1.5
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-wider
                              text-orange-400
                            "
                          >
                            <span
                              className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-orange-500
                              "
                            />

                            {project.type}
                          </div>


                          {/* TECHNOLOGIES */}

                          <div className="flex flex-wrap gap-1">

                            {project.technologies.map((technology) => (
                              <span
                                key={technology}
                                className="
                                  rounded-md
                                  border
                                  border-white/10
                                  bg-white/[0.04]
                                  px-1.5
                                  py-1
                                  text-[8px]
                                  font-bold
                                  text-stone-400
                                  transition-all
                                  duration-300
                                  group-hover:border-orange-500/20
                                "
                              >
                                {technology}
                              </span>
                            ))}

                          </div>

                        </div>

                      </div>

                    </div>

                  </motion.button>
                );
              })}

            </div>

          </div>


          {/* =================================================
              MOBILE PROJECT SELECTOR
          ================================================= */}

          <div
            className="
              mt-4
              flex
              gap-2.5
              overflow-x-auto
              pb-2
              lg:hidden
            "
          >

            {projects.map((project, index) => (
              <button
                key={`mobile-${project.title}`}
                type="button"
                onClick={() => setActiveProject(index)}
                className={`shrink-0 rounded-lg border px-3 py-2 text-left transition-all duration-300 ${
                  index === activeProject
                    ? "border-orange-500 bg-orange-500/10 text-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.10)]"
                    : "border-white/10 bg-white/[0.03] text-stone-400 hover:border-orange-500/50"
                }`}
              >

                <span
                  className="
                    block
                    text-[8px]
                    font-black
                    text-stone-500
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>


                <span
                  className="
                    mt-0.5
                    block
                    max-w-[130px]
                    truncate
                    text-[10px]
                    font-black
                  "
                >
                  {project.title}
                </span>

              </button>
            ))}

          </div>

        </div>
      );
    })()}

  </div>
</Section>

<Section
  id="skills"
  className="relative w-full overflow-hidden border-t border-orange-500/10 bg-[#080503] text-white"
>
  {/* =====================================================
      BACKGROUND
  ===================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Grid */}

    <div
      className="absolute inset-0 opacity-[0.08]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(249,115,22,0.20) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.20) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />

    {/* Orange glows */}

    <div className="absolute -left-48 -top-48 h-[520px] w-[520px] rounded-full bg-orange-600/15 blur-[150px]" />

    <div className="absolute right-[-220px] top-[20%] h-[560px] w-[560px] rounded-full bg-orange-500/10 blur-[160px]" />

    <div className="absolute bottom-[-250px] left-[25%] h-[520px] w-[520px] rounded-full bg-orange-600/10 blur-[150px]" />

    {/* Decorative rings */}

    <div className="absolute -left-32 top-[-100px] h-[360px] w-[360px] rounded-full border border-orange-500/10" />

    <div className="absolute -left-20 top-[-60px] h-[250px] w-[250px] rounded-full border border-orange-500/10" />

    <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full border border-orange-500/10" />

    {/* Top-right dots */}

    <div className="absolute right-[5%] top-[12%] grid grid-cols-4 gap-x-6 gap-y-5 opacity-60">
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="h-[4px] w-[4px] rounded-full bg-orange-500"
        />
      ))}
    </div>

    {/* Bottom-left dots */}

    <div className="absolute bottom-[9%] left-[4%] grid grid-cols-5 gap-x-6 gap-y-5 opacity-50">
      {Array.from({ length: 15 }).map((_, index) => (
        <span
          key={index}
          className="h-[4px] w-[4px] rounded-full bg-orange-500"
        />
      ))}
    </div>
  </div>

  {/* =====================================================
      CONTENT
  ===================================================== */}

  <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 xl:px-16">

    {/* ===================================================
        SECTION HEADING
    =================================================== */}

    <motion.div
      variants={stagger}
      className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
    >

      {/* Badge */}

      <motion.div
        variants={childReveal}
        className="mx-auto mb-4 inline-flex items-center gap-3 rounded-full border border-orange-500/70 bg-orange-500/[0.06] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-400 sm:text-xl"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.9)]" />

        TECH STACK
      </motion.div>

      {/* Description */}

      <motion.p
        variants={childReveal}
        className="mx-auto mt-4 max-w-2xl text-base leading-6 text-stone-400 sm:text-lg sm:leading-8"
      >
        A practical stack I use to design, build, deploy and maintain
        modern digital applications.
      </motion.p>

    </motion.div>

    {/* ===================================================
        BENTO GRID
    =================================================== */}

    <motion.div
      variants={stagger}
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
    >

      {[
        {
          number: "01",
          title: "Frontend Development",
          shortTitle: "Frontend",
          description:
            "Modern, responsive and interactive user interfaces.",
          categoryIcon: "react",
          categoryColor: "61DAFB",

          items: [
            ["React.js", "react", "61DAFB"],
            ["Next.js", "nextdotjs", "FFFFFF"],
            ["JavaScript", "javascript", "F7DF1E"],
            ["TypeScript", "typescript", "3178C6"],
            ["HTML5", "html5", "E34F26"],
            ["CSS3", "css", "1572B6"],
            ["Tailwind CSS", "tailwindcss", "06B6D4"],
            ["Bootstrap", "bootstrap", "7952B3"],
          ],

          layout: "lg:col-span-3 lg:row-span-2",
        },

        {
          number: "02",
          title: "Backend Development",
          shortTitle: "Backend",
          description:
            "Secure, scalable and high-performance server-side applications.",
          categoryIcon: "nodedotjs",
          categoryColor: "5FA04E",

          items: [
            ["Node.js", "nodedotjs", "5FA04E"],
            ["Express.js", "express", "FFFFFF"],
            ["Python", "python", "3776AB"],
            ["Django", "django", "3776AB"],
            ["FastAPI", "fastapi", "009688"],
            ["REST APIs", "openapiinitiative", "6BA539"],
            ["JWT Authentication", "jsonwebtokens", "ffff"],
            ["Payment Gateway", "stripe", "635BFF"],
          ],

          layout: "lg:col-span-3 lg:row-span-2",
        },

        {
          number: "03",
          title: "Database Management",
          shortTitle: "Database",
          description:
            "Structured and document-based data systems.",
          categoryIcon: "mongodb",
          categoryColor: "47A248",

          items: [
            ["MongoDB", "mongodb", "47A248"],
            ["MySQL", "mysql", "3776AB"],
            ["PostgreSQL", "postgresql", "4169E1"],
          ],

          layout: "lg:col-span-2",
        },

        {
          number: "04",
          title: "DevOps & Cloud",
          shortTitle: "Cloud",
          description:
            "Deploying, hosting and managing applications in the cloud.",
          categoryIcon: "docker",
          categoryColor: "2496ED",

          items: [
            ["Git", "git", "F05032"],
            ["GitHub", "github", "FFFFFF"],
            ["Docker", "docker", "2496ED"],
            ["AWS", "amazonaws", "FF9900"],
            ["Vercel", "vercel", "FFFFFF"],
            ["Render", "render", "46E3B7"],
            ["Railway", "railway", "FFFFFF"],
          ],

          layout: "lg:col-span-2",
        },

        {
          number: "05",
          title: "Tools & Others",
          shortTitle: "Tools",
          description:
            "Everyday tools that improve productivity and development workflow.",
          categoryIcon: "visualstudiocode",
          categoryColor: "007ACC",

          items: [
            ["VS Code", "gnubash", "007ACC"],
            ["Postman", "postman", "FF6C37"],
            ["Figma", "figma", "F24E1E"],
            ["npm", "npm", "CB3837"],
            ["Linux", "linux", "FCC624"],
            ["Command Line", "gnubash", "4EAA25"],
          ],

          layout: "lg:col-span-2",
        },

      ].map((group, index) => (

        <motion.article
          key={group.title}
          variants={childReveal}
          whileHover={{
            y: -6,
          }}
          className={`group relative min-w-0 overflow-hidden rounded-[1.6rem] border border-orange-500/40 bg-[#100805]/90 p-5 shadow-[0_20px_60px_rgba(249,115,22,0.08)] transition-all duration-500 hover:border-orange-500/80 hover:shadow-[0_25px_80px_rgba(249,115,22,0.18)] sm:p-6 ${group.layout}`}
        >

          {/* =================================================
              TOP ACCENT
          ================================================= */}

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

          {/* =================================================
              BACKGROUND GLOW
          ================================================= */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-orange-500/[0.07] blur-3xl transition-all duration-500 group-hover:bg-orange-500/[0.15]" />

          {/* =================================================
              LARGE SVG GRAPHIC
          ================================================= */}

          <div className="pointer-events-none absolute right-5 top-5 z-0 h-24 w-24 opacity-[0.08] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.16] sm:h-28 sm:w-28">

            {/* FRONTEND */}

            {index === 0 && (
              <svg
                viewBox="0 0 160 160"
                className="h-full w-full text-cyan-400"
                fill="none"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="57"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                />

                <ellipse
                  cx="80"
                  cy="80"
                  rx="55"
                  ry="22"
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="rotate(60 80 80)"
                />

                <ellipse
                  cx="80"
                  cy="80"
                  rx="55"
                  ry="22"
                  stroke="currentColor"
                  strokeWidth="3"
                  transform="rotate(-60 80 80)"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <circle
                  cx="80"
                  cy="80"
                  r="5"
                  fill="currentColor"
                />
              </svg>
            )}

            {/* BACKEND */}

            {index === 1 && (
              <svg
                viewBox="0 0 160 160"
                className="h-full w-full text-green-400"
                fill="none"
              >
                <rect
                  x="27"
                  y="30"
                  width="106"
                  height="30"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <rect
                  x="27"
                  y="65"
                  width="106"
                  height="30"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <rect
                  x="27"
                  y="100"
                  width="106"
                  height="30"
                  rx="8"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <circle
                  cx="42"
                  cy="45"
                  r="4"
                  fill="currentColor"
                />

                <circle
                  cx="42"
                  cy="80"
                  r="4"
                  fill="currentColor"
                />

                <circle
                  cx="42"
                  cy="115"
                  r="4"
                  fill="currentColor"
                />

                <path
                  d="M58 45h48M58 80h48M58 115h48"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* DATABASE */}

            {index === 2 && (
              <svg
                viewBox="0 0 160 160"
                className="h-full w-full text-emerald-400"
                fill="none"
              >
                <ellipse
                  cx="80"
                  cy="40"
                  rx="48"
                  ry="18"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M32 40v42c0 10 21 18 48 18s48-8 48-18V40"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M32 82v38c0 10 21 18 48 18s48-8 48-18V82"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  d="M32 61c0 10 21 18 48 18s48-8 48-18"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            )}

            {/* DEVOPS */}

            {index === 3 && (
              <svg
                viewBox="0 0 160 160"
                className="h-full w-full text-blue-400"
                fill="none"
              >
                <path
                  d="M48 112h62c17 0 30-12 30-28s-12-27-28-28c-4-20-21-34-42-34-24 0-43 18-44 42-15 3-26 14-26 29 0 11 8 19 18 19h30Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                <path
                  d="M55 93l15-15 15 15"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M70 78v30"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {/* TOOLS */}

            {index === 4 && (
              <svg
                viewBox="0 0 160 160"
                className="h-full w-full text-purple-400"
                fill="none"
              >
                <rect
                  x="32"
                  y="32"
                  width="96"
                  height="96"
                  rx="18"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                <path
                  d="M58 94l20-20 12 12 20-25"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="58"
                  cy="94"
                  r="5"
                  fill="currentColor"
                />

                <circle
                  cx="78"
                  cy="74"
                  r="5"
                  fill="currentColor"
                />

                <circle
                  cx="90"
                  cy="86"
                  r="5"
                  fill="currentColor"
                />

                <circle
                  cx="110"
                  cy="61"
                  r="5"
                  fill="currentColor"
                />
              </svg>
            )}

          </div>

          {/* =================================================
              CARD HEADER
          ================================================= */}

          <div className="relative z-10 flex items-start justify-between gap-4">

            <div className="min-w-0 max-w-[62%]">

              {/* Number */}

              <div className="mb-3 flex items-center gap-2">

                <span className="text-[11px] font-black tracking-[0.18em] text-orange-500">
                  {group.number}
                </span>

                <span className="h-px w-8 bg-orange-500/40" />

                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-600">
                  STACK
                </span>

              </div>

              {/* Title */}

              <h3 className="max-w-[250px] text-[17px] font-black leading-tight tracking-[-0.02em] text-white sm:text-xl">
                {group.title}
              </h3>

              {/* Description */}

              <p className="mt-2 max-w-[300px] text-[11px] leading-8 text-stone-400 sm:text-base">
                {group.description}
              </p>

            </div>

          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="relative z-10 mt-4 mb-4 h-px bg-gradient-to-r from-orange-500/30 via-white/10 to-transparent" />

          {/* =================================================
              TECHNOLOGY CHIPS
          ================================================= */}

          <div className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-3">

            {group.items.map(([name, slug, color]) => (

              <motion.div
                key={name}
                whileHover={{
                  scale: 1.04,
                  y: -2,
                }}
                className="group/tech flex min-h-[64px] items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-2.5 py-2 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/[0.06]"
              >

                {/* Technology SVG / Logo */}

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035] p-1.5 transition-all duration-300 group-hover/tech:border-orange-500/30">

                  {name === "AWS" ? (
                    <svg
                      viewBox="0 0 160 160"
                      className="h-8 w-8 text-orange-400"
                      fill="none"
                    >
                      <path
                        d="M48 112h62c17 0 30-12 30-28s-12-27-28-28c-4-20-21-34-42-34-24 0-43 18-44 42-15 3-26 14-26 29 0 11 8 19 18 19h30Z"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M55 93l15-15 15 15"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M70 78v30"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <img
                      src={`https://cdn.simpleicons.org/${slug}/${color}`}
                      alt={`${name} logo`}
                      className="h-8 w-8 object-contain"
                      loading="lazy"
                    />
                  )}

                </div>

                {/* Full Technology Name */}

                <span className="min-w-0 flex-1 whitespace-normal break-words text-[9px] font-bold leading-[1.15] text-stone-300 transition-colors group-hover/tech:text-white sm:text-[12px]">
                  {name}
                </span>

              </motion.div>

            ))}

          </div>

        </motion.article>

      ))}

    </motion.div>

    {/* ===================================================
        BOTTOM MESSAGE
    =================================================== */}

    <motion.div
  variants={childReveal}
  className="
    mx-auto
    mt-10
    w-full
    max-w-3xl
    rounded-2xl
    border
    border-orange-500/15
    bg-orange-500/[0.025]
    px-5
    py-4
    text-center
    text-[11px]
    leading-6
    text-stone-500
    sm:text-lg
    lg:max-w-none
    lg:whitespace-nowrap
  "
>
  Always learning, experimenting and expanding my stack as projects
  demand better solutions.
</motion.div>

  </div>
</Section>

{/* =====================================================
    CONTACT — EMAILJS CONTACT SECTION
===================================================== */}

<Section
  id="contact"
  className="
    relative
    w-full
    overflow-hidden
    border-t
    border-orange-500/10
    bg-[#0D0A08]
    text-white
  "
>
  {/* ===================================================
      BACKGROUND
  =================================================== */}

  <div className="pointer-events-none absolute inset-0 overflow-hidden">

    {/* Left glow */}

    <div
      className="
        absolute
        -left-40
        top-20
        h-[500px]
        w-[500px]
        rounded-full
        bg-orange-600/10
        blur-[150px]
      "
    />

    {/* Right glow */}

    <div
      className="
        absolute
        -right-40
        bottom-0
        h-[550px]
        w-[550px]
        rounded-full
        bg-orange-500/10
        blur-[160px]
      "
    />

    {/* Grid */}

    <div
      className="
        absolute
        inset-0
        opacity-[0.045]
      "
      style={{
        backgroundImage:
          "linear-gradient(rgba(249,115,22,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.8) 1px, transparent 1px)",
        backgroundSize: "55px 55px",
      }}
    />

    {/* Decorative circles */}

    <div
      className="
        absolute
        right-[8%]
        top-[15%]
        h-40
        w-40
        rounded-full
        border
        border-orange-500/10
      "
    />

    <div
      className="
        absolute
        right-[10%]
        top-[18%]
        h-28
        w-28
        rounded-full
        border
        border-orange-500/10
      "
    />

    {/* Decorative dots */}

    <div
      className="
        absolute
        bottom-[15%]
        left-[5%]
        grid
        grid-cols-5
        gap-4
        opacity-30
      "
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <span
          key={index}
          className="
            h-1
            w-1
            rounded-full
            bg-orange-500
          "
        />
      ))}
    </div>

  </div>


  {/* ===================================================
      MAIN CONTAINER
  =================================================== */}

 <div
  className="
    relative
    z-10
    mx-auto
    w-full
    max-w-[1500px]
    px-5
    pt-0
   

    sm:px-8
    sm:pt-0
    sm:pb-12

    md:px-10
    md:pt-0
    md:pb-14

    lg:px-14
    lg:pt-0
    lg:pb-16

    xl:px-20
    xl:pt-0
  "
>
  

    {/* =================================================
        HEADER
    ================================================= */}

    <motion.div
      variants={stagger}
      className="
        mx-auto
        max-w-5xl
        text-center
      "
    >

      {/* Label */}

      <motion.div
        variants={childReveal}
        className="
          mx-auto
          mb-5
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-orange-500/30
          bg-orange-500/5
          px-4
          py-2
          text-[10px]
          font-black
          uppercase
          tracking-[0.3em]
          text-orange-400
          sm:text-lg
        "
      >

        <span
          className="
            h-2
            w-2
            rounded-full
            bg-orange-500
            shadow-[0_0_12px_rgba(249,115,22,0.9)]
          "
        />

        GET IN TOUCH

      </motion.div>


      {/* Heading */}

      <motion.h2
        variants={childReveal}
        className="
  text-3xl
  font-black
  leading-[0.98]
  tracking-[-0.04em]
  text-white

  sm:text-4xl
  md:text-5xl
  lg:text-6xl
  xl:text-[4rem]
"
      >

        Let&apos;s Build Something

        <br />

        <span
          className="
            bg-gradient-to-r
            from-orange-400
            via-orange-500
            to-amber-400
            bg-clip-text
            text-transparent
          "
        >
          Great Together.
        </span>

      </motion.h2>


      {/* Description */}

      <motion.p
        variants={childReveal}
        className="
          mx-auto
          mt-6
          max-w-2xl
          text-sm
          leading-7
          text-stone-400
          
          sm:text-[1.25rem]
          sm:leading-8
        "
      >
        Have a project in mind, an idea to discuss, or simply
        want to connect? Let&apos;s turn your ideas into something
        meaningful.
      </motion.p>

    </motion.div>


    {/* =================================================
        MAIN CONTACT GRID
    ================================================= */}

    <div
      className="
        mt-14
        grid
        w-full
        items-stretch
        gap-6

        lg:mt-20
        lg:grid-cols-[0.95fr_1.05fr]

        xl:gap-8
      "
    >


      {/* =================================================
          LEFT — IMAGE + CONTACT DETAILS
      ================================================= */}

      <motion.div
        variants={childReveal}
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-[2rem]
          border
          border-orange-500/20
          bg-[#110C09]
          p-4
          shadow-[0_25px_90px_rgba(0,0,0,0.35)]

          sm:p-5
          lg:p-6
        "
      >

        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.16),transparent_58%)]
          "
        />


        {/* Label */}

        <div
          className="
            relative
            z-20
            mb-4
            inline-flex
            rounded-full
            border
            border-white/10
            bg-black/40
            px-3
            py-1.5
            text-[20px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-orange-300
            backdrop-blur-md
          "
        >
          LET&apos;S CONNECT
        </div>


        {/* =================================================
            IMAGE
        ================================================= */}

        <div
          className="
            relative
            z-10
            flex
            h-[300px]
            w-full
            items-end
            justify-center
            overflow-hidden
            rounded-[1.5rem]
            border
            border-orange-500/10
            bg-black

            sm:h-[360px]
            md:h-[400px]
            lg:h-[430px]
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_55%,rgba(249,115,22,0.12),transparent_65%)]
            "
          />

          <img
            src="/assets/contact-illustration.png"
            alt="Let's connect"
            className="
              relative
              z-10
              h-full
              w-full
              object-contain
              object-bottom
              transition-transform
              duration-700
              group-hover:scale-[1.025]
            "
          />


          {/* Image fade */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-20
              h-28
              bg-gradient-to-t
              from-[#110C09]
              via-[#110C09]/50
              to-transparent
            "
          />

        </div>


        {/* =================================================
            IDEA TEXT
        ================================================= */}

        <div
          className="
            relative
            z-20
            mt-5
            px-1
          "
        >

          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-orange-400
            "
          >
            HAVE AN IDEA?
          </p>

          <p
            className="
              mt-1
              text-lg
              font-black
              text-white
              sm:text-xl
            "
          >
            Let&apos;s make it real.
          </p>

        </div>


        {/* =================================================
            CONTACT OPTIONS
        ================================================= */}

        <div
          className="
            relative
            z-20
            mt-6
            grid
            grid-cols-1
            gap-3

            sm:grid-cols-2
          "
        >


          {/* =================================================
              GMAIL
          ================================================= */}

          <a
            href="mailto:chchandra614@gmail.com"
            className="
              group/contact
              flex
              min-w-0
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              p-4
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500/[0.06]
              hover:shadow-[0_10px_30px_rgba(249,115,22,0.10)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-orange-400
                transition-all
                duration-300

                group-hover/contact:scale-110
                group-hover/contact:border-orange-500/50
                group-hover/contact:bg-orange-500
                group-hover/contact:text-white
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >

                <rect
                  width="20"
                  height="16"
                  x="2"
                  y="4"
                  rx="2"
                />

                <path
                  d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                />

              </svg>

            </div>

            <div className="min-w-0">

              <p className="text-[15px] font-black uppercase tracking-[0.2em] text-stone-500">
                GMAIL
              </p>

              <p className="mt-1 truncate text-xs font-bold text-stone-200 transition-colors group-hover/contact:text-orange-300 sm:text-sm">
                chchandra614@gmail.com
              </p>

            </div>

          </a>


          {/* =================================================
              PHONE
          ================================================= */}

          <a
            href="tel:+919390248043"
            className="
              group/contact
              flex
              min-w-0
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              p-4
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500/[0.06]
              hover:shadow-[0_10px_30px_rgba(249,115,22,0.10)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-orange-400
                transition-all
                duration-300

                group-hover/contact:scale-110
                group-hover/contact:border-orange-500/50
                group-hover/contact:bg-orange-500
                group-hover/contact:text-white
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 16.92v3a2 2 0 0 1-2.18 2
                  19.79 19.79 0 0 1-8.63-3.07
                  19.5 19.5 0 0 1-6-6
                  19.79 19.79 0 0 1-3.07-8.67
                  A2 2 0 0 1 4.11 2h3
                  a2 2 0 0 1 2 1.72
                  12.84 12.84 0 0 0 .7 2.81
                  2 2 0 0 1-.45 2.11L8.09 9.91
                  a16 16 0 0 0 6 6l1.27-1.27
                  a2 2 0 0 1 2.11-.45
                  12.84 12.84 0 0 0 2.81.7
                  A2 2 0 0 1 22 16.92z"
                />

              </svg>

            </div>

            <div className="min-w-0">

              <p className="text-[15px] font-black uppercase tracking-[0.2em] text-stone-500">
                PHONE
              </p>

              <p className="mt-1 text-sm font-bold text-stone-200 transition-colors group-hover/contact:text-orange-300">
                +91 93902 48043
              </p>

            </div>

          </a>


          {/* =================================================
              LINKEDIN
          ================================================= */}

          <a
            href="https://www.linkedin.com/in/chandrakiran-chidurala/"
            target="_blank"
            rel="noreferrer"
            className="
              group/contact
              flex
              min-w-0
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              p-4
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500/[0.06]
              hover:shadow-[0_10px_30px_rgba(249,115,22,0.10)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-sm
                font-black
                text-orange-400
                transition-all
                duration-300

                group-hover/contact:scale-110
                group-hover/contact:border-orange-500/50
                group-hover/contact:bg-orange-500
                group-hover/contact:text-white
              "
            >
              in
            </div>

            <div className="min-w-0">

              <p className="text-[15px] font-black uppercase tracking-[0.2em] text-stone-500">
                LINKEDIN
              </p>

              <p className="mt-1 text-sm font-bold text-stone-200 transition-colors group-hover/contact:text-orange-300">
                Connect with me
              </p>

            </div>

          </a>


          {/* =================================================
              INSTAGRAM
          ================================================= */}

          <a
            href="https://www.instagram.com/ch_c_kiran/"
            target="_blank"
            rel="noreferrer"
            className="
              group/contact
              flex
              min-w-0
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              p-4
              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500/[0.06]
              hover:shadow-[0_10px_30px_rgba(249,115,22,0.10)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-orange-400
                transition-all
                duration-300

                group-hover/contact:scale-110
                group-hover/contact:border-orange-500/50
                group-hover/contact:bg-orange-500
                group-hover/contact:text-white
              "
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >

                <rect
                  width="20"
                  height="20"
                  x="2"
                  y="2"
                  rx="5"
                />

                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                />

                <line
                  x1="17.5"
                  x2="17.51"
                  y1="6.5"
                  y2="6.5"
                />

              </svg>

            </div>

            <div className="min-w-0">

              <p className="text-[15px] font-black uppercase tracking-[0.2em] text-stone-500">
                INSTAGRAM
              </p>

              <p className="mt-1 text-sm font-bold text-stone-200 transition-colors group-hover/contact:text-orange-300">
                Follow me
              </p>

            </div>

          </a>

        </div>

      </motion.div>


      {/* =================================================
          RIGHT — EMAILJS FORM
      ================================================= */}

      <motion.div
        variants={childReveal}
        className="
          rounded-[2rem]
          border
          border-orange-500/20
          bg-[#110C09]
          p-6
          shadow-[0_25px_90px_rgba(0,0,0,0.3)]

          sm:p-8
          lg:p-10
        "
      >

        {/* Form heading */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-15
                w-15
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-orange-500/30
                bg-orange-500/10
                text-lg
                text-orange-400
              "
            >
              ↗
            </div>

            <div>

              <p className="text-[20px] font-black uppercase tracking-[0.25em] text-orange-400">
                START A CONVERSATION
              </p>

          

            </div>

          </div>

          <p className="mt-5 max-w-lg text-base leading-7 text-stone-400">
            Send me your project details and I&apos;ll get back
            to you as soon as possible.
          </p>

        </div>


        {/* =================================================
            EMAILJS FORM
        ================================================= */}

        <form
          ref={contactForm}
          onSubmit={sendContactEmail}
          className="space-y-5"
        >

          {/* NAME + EMAIL */}

          <div className="grid gap-5 sm:grid-cols-2">

            {/* NAME */}

            <div>

              <label
                htmlFor="contact-name"
                className="
                  mb-2
                  block
                  text-[15px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-stone-400
                "
              >
                Your Name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  py-3.5
                  text-sm
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-stone-600
                  focus:border-orange-500/60
                  focus:bg-orange-500/[0.03]
                  focus:ring-2
                  focus:ring-orange-500/10
                "
              />

            </div>


            {/* EMAIL */}

            <div>

              <label
                htmlFor="contact-email"
                className="
                  mb-2
                  block
                  text-[15px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-stone-400
                "
              >
                Your Email
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  py-3.5
                  text-sm
                  text-white
                  outline-none
                  transition-all
                  duration-300
                  placeholder:text-stone-600
                  focus:border-orange-500/60
                  focus:bg-orange-500/[0.03]
                  focus:ring-2
                  focus:ring-orange-500/10
                "
              />

            </div>

          </div>


          {/* SUBJECT */}

          <div>

            <label
              htmlFor="contact-subject"
              className="
                mb-2
                block
                text-[15px]
                font-bold
                uppercase
                tracking-wider
                text-stone-400
              "
            >
              Subject
            </label>

            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              placeholder="Project discussion"
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-white/[0.035]
                px-4
                py-3.5
                text-sm
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-stone-600
                focus:border-orange-500/60
                focus:bg-orange-500/[0.03]
                focus:ring-2
                focus:ring-orange-500/10
              "
            />

          </div>


          {/* MESSAGE */}

          <div>

            <label
              htmlFor="contact-message"
              className="
                mb-2
                block
                text-[15px]
                font-bold
                uppercase
                tracking-wider
                text-stone-400
              "
            >
              Your Message
            </label>

            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-white/10
                bg-white/[0.035]
                px-4
                py-3.5
                text-sm
                leading-6
                text-white
                outline-none
                transition-all
                duration-300
                placeholder:text-stone-600
                focus:border-orange-500/60
                focus:bg-orange-500/[0.03]
                focus:ring-2
                focus:ring-orange-500/10
              "
            />

          </div>


          {/* =================================================
              STATUS
          ================================================= */}

          {contactStatus === "success" && (
            <div
              className="
                rounded-xl
                border
                border-green-500/20
                bg-green-500/10
                px-4
                py-3
                text-center
                text-xs
                font-bold
                text-green-400
              "
            >
              ✓ Message sent successfully. Thank you!
            </div>
          )}

          {contactStatus === "error" && (
            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-4
                py-3
                text-center
                text-lg
                font-bold
                text-red-400
              "
            >
              Something went wrong. Please try again.
            </div>
          )}


          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={contactSending}
            className={`
              group
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-xl
              px-6
              py-4
              text-lg
              font-black
              text-white
              transition-all
              duration-300

              ${
                contactSending
                  ? "cursor-not-allowed bg-orange-400"
                  : contactStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : contactStatus === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-orange-500 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_18px_45px_rgba(249,115,22,0.38)]"
              }
            `}
          >

            {contactSending ? (
              <>
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/30
                    border-t-white
                  "
                />

                Sending...
              </>
            ) : contactStatus === "success" ? (
              <>
                Message Sent ✓
              </>
            ) : contactStatus === "error" ? (
              <>
                Try Again
              </>
            ) : (
              <>
                Send Message

                
              </>
            )}

          </button>


          {/* Helper */}

          {!contactStatus && (
            <p
              className="
                text-center
                text-[10px]
                leading-5
                text-stone-600
              "
            >
              Your message will be delivered directly to my inbox.
            </p>
          )}

        </form>

      </motion.div>

    </div>


   

  </div>


  

</Section>
{/* =====================================================
    FOOTER
===================================================== */}

<footer
  className="
    relative
    w-full
    overflow-hidden
    border-t
    border-orange-500/10
    bg-[#080503]
    text-white
  "
>
  {/* =====================================================
      BACKGROUND
  ===================================================== */}

  <div className="pointer-events-none absolute inset-0">
    {/* Orange glow */}
    <div
      className="
        absolute
        left-1/2
        top-0
        h-[280px]
        w-[500px]
        -translate-x-1/2
        rounded-full
        bg-orange-600/10
        blur-[130px]
      "
    />

    {/* Bottom orange line */}
    <div
      className="
        absolute
        bottom-0
        left-0
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-orange-500
        to-transparent
        opacity-60
      "
    />

    {/* Decorative dots */}
    <div
      className="
        absolute
        bottom-12
        right-10
        grid
        grid-cols-4
        gap-3
        opacity-30
      "
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className="h-1 w-1 rounded-full bg-orange-500"
        />
      ))}
    </div>
  </div>

  {/* =====================================================
      FOOTER CONTAINER
  ===================================================== */}

 <div
  className="
    relative
    z-10
    mx-auto
    w-full
    max-w-[1700px]
    px-5
    pt-0
    pb-1
    sm:px-8
    sm:pt-0
    sm:pb-4
    md:px-10
    md:pt-0
    md:pb-5
    lg:pl-16
    lg:pr-10
    lg:pt-0
    lg:pb-6
    xl:pl-20
    xl:pr-12
    xl:pt-0
    xl:pb-6
  "
>
    {/* =====================================================
        MAIN FOOTER
    ===================================================== */}

    <div
      className="
        grid
        grid-cols-1
        gap-12
        lg:grid-cols-[32%_68%]
        lg:gap-0
      "
    >
      {/* =================================================
          LEFT SIDE — BRAND
      ================================================= */}

      <div
        className="
          min-w-0
          text-center
          lg:border-r
          lg:border-white/[0.07]
          lg:pr-8
          xl:pr-10
        "
      >
       

        {/* Logo */}
        <a
          href="#home"
          className="
            group
            mt-8
            inline-flex
            items-center
            justify-center
          "
        >
          <div
            className="
              flex
              h-30
              w-30
              items-center
              justify-center
              overflow-hidden
              transition-transform
              duration-300
              group-hover:scale-105
              sm:h-28
              sm:w-28
            "
          >
            <img
              src="/assets/ck-logo.png"
              alt="Chandra Kiran logo"
              className="
                h-full
                w-full
                object-contain
              "
            />
          </div>
        </a>

        {/* Signature Name */}
        <h3
          className="
            mt-5
            text-4xl
            font-normal
            italic
            tracking-wide
            sm:text-5xl
          "
          style={{
            fontFamily:
              "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive",
            color: "#f97316",
            textShadow:
              "0 0 24px rgba(249,115,22,0.18)",
          }}
        >
          Chandra Kiran
        </h3>

        {/* Role */}
        <p
          className="
            mt-3
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.4em]
            sm:text-base
          "
          style={{
            fontFamily:
              "'Arial Narrow', 'Trebuchet MS', sans-serif",
            color: "#d6a77a",
          }}
        >
          Full Stack Developer
        </p>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-6
            max-w-xl
            text-base
            leading-7
            text-stone-400
            lg:max-w-md
            xl:max-w-lg
          "
        >
          Full Stack Developer building modern, scalable and
          user-focused web applications with clean code and
          thoughtful design.
        </p>

        {/* =================================================
            SOCIAL ICONS
        ================================================= */}

        <div className="mt-7 flex items-center justify-center gap-3">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/chandrakiran-chidurala/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="
              flex
              h-15
              w-15
              items-center
              justify-center
              rounded-xl
              border
              border-orange-400
              bg-white/[0.03]
              text-stone-300
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500
              hover:text-white
              hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)]
            "
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-8.25 6.75H8v8.5h2.75v-8.5ZM9.38 5.5a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25ZM16 9.55c-1.34 0-2.25.74-2.62 1.43v-1.23h-2.75v8.5h2.75v-4.2c0-1.1.2-2.16 1.57-2.16 1.35 0 1.36 1.26 1.36 2.23v4.13h2.75v-4.68c0-2.3-.5-4.02-3.06-4.02Z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Chckiran01"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="
              flex
              h-15
              w-15
              items-center
              justify-center
              rounded-xl
              border
              border-orange-400
              bg-white/[0.03]
              text-stone-300
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500
              hover:text-white
              hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)]
            "
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.57 9.57 0 0 1 12 7.75c.85 0 1.71.11 2.51.32 1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ch_c_kiran/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="
              flex
              h-15
              w-15
              items-center
              justify-center
              rounded-xl
              border
              border-orange-400
              bg-white/[0.03]
              text-stone-300
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-500/50
              hover:bg-orange-500
              hover:text-white
              hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)]
            "
          >
            <svg
              className="h-5 w-5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
              />

              <circle
                cx="12"
                cy="12"
                r="4"
              />

              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                className="fill-current stroke-none"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div
        className="
          min-w-0
          w-full
          flex
          flex-col
          lg:pl-8
          xl:pl-10
        "
      >
        {/* =================================================
            QUOTE
        ================================================= */}

        <div
          className="
            relative
            w-full
            min-w-0
            overflow-hidden
            rounded-2xl
            border
            border-orange-500/15
            bg-gradient-to-br
            from-orange-500/[0.07]
            via-white/[0.025]
            to-transparent
            px-5
            py-6
            shadow-[0_20px_60px_rgba(0,0,0,0.2)]
            sm:px-7
            sm:py-7
            lg:px-8
          "
        >
          {/* Orange accent */}
          <div
            className="
              absolute
              left-0
              top-0
              h-full
              w-[3px]
              rounded-l-2xl
              bg-gradient-to-b
              from-orange-400
              via-orange-500
              to-transparent
            "
          />

          {/* Decorative quote */}
          <span
            className="
              pointer-events-none
              absolute
              right-5
              top-1
              text-7xl
              font-black
              leading-none
              text-orange-500/[0.08]
            "
          >
            ”
          </span>

          <p
  className="
    relative
    w-full
    max-w-none
    text-sm
    font-semibold
    leading-7
    tracking-tight
    text-stone-100
    sm:text-base
    sm:leading-7
    lg:text-lg
    lg:leading-8
    xl:text-xl
    xl:whitespace-nowrap
  "
>
  “Curiosity fuels ideas. Precision shapes the craft. Impact defines the outcome.”
</p>
        </div>

        {/* =================================================
            NAVIGATION + CONTACT
        ================================================= */}

        <div
          className="
            mt-7
            grid
            min-w-0
            grid-cols-1
            gap-6
            lg:grid-cols-2
          "
        >
          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div
            className="
              min-w-0
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.018]
              p-6
              sm:p-7
            "
          >
            <h4
              className="
                text-center
                text-[15px]
                font-black
                uppercase
                tracking-[0.28em]
                text-orange-400
              "
            >
              Navigation
            </h4>

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-x-8
                gap-y-5
                text-center
              "
            >
              {[
                ["Home", "#home"],
                ["About", "#about"],
                ["Expertise", "#expertise"],
                ["Skills", "#skills"],
                ["Projects", "#projects"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="
                    text-base
                    text-stone-400
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-orange-400
                  "
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* =================================================
              GET IN TOUCH
          ================================================= */}

          <div
            className="
              min-w-0
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.018]
              p-6
              sm:p-7
            "
          >
            <h4
              className="
                text-center
                text-[15px]
                font-black
                uppercase
                tracking-[0.28em]
                text-orange-400
              "
            >
              Get In Touch
            </h4>

            <div className="mt-6 space-y-4">
              {/* Email */}
              <a
                href="mailto:chchandra614@gmail.com"
                className="
                  block
                  min-w-0
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-black/10
                  px-4
                  py-4
                  text-center
                  transition-all
                  duration-300
                  hover:border-orange-500/20
                  hover:bg-orange-500/[0.03]
                "
              >
                <span
                  className="
                    block
                    text-[15px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-stone-600
                  "
                >
                  Email
                </span>

                <span
                  className="
                    mt-2
                    block
                    break-all
                    text-base
                    text-stone-400
                    transition-colors
                    duration-300
                    hover:text-orange-400
                  "
                >
                  chchandra614@gmail.com
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+919390248043"
                className="
                  block
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-black/10
                  px-4
                  py-4
                  text-center
                  transition-all
                  duration-300
                  hover:border-orange-500/20
                  hover:bg-orange-500/[0.03]
                "
              >
                <span
                  className="
                    block
                    text-[15px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-stone-600
                  "
                >
                  Phone
                </span>

                <span
                  className="
                    mt-2
                    block
                    text-base
                    text-stone-400
                    transition-colors
                    duration-300
                    hover:text-orange-400
                  "
                >
                  +91 93902 48043
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* =====================================================
        BOTTOM LINE
    ===================================================== */}

    <div
      className="
        mt-10
        flex
        flex-col
        gap-3
        border-t
        border-white/10
        pt-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <p
        className="
          text-[15px]
          font-medium
          uppercase
          tracking-[0.15em]
          text-stone-600
        "
      >
        © {new Date().getFullYear()} Chandra Kiran. All rights reserved.
      </p>

      <a
        href="#home"
        className="
          w-fit
          text-[15px]
          font-bold
          uppercase
          tracking-wider
          text-stone-600
          transition-colors
          hover:text-orange-400
        "
      >
        Back to Top ↑
      </a>
    </div>
  </div>
</footer>

    </main>
  );
}