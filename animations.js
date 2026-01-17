gsap.registerPlugin(ScrollTrigger);

// const prefersReducedMotion = window.matchMedia(
//   "(prefers-reduced-motion: reduce)"
// ).matches;

// if (prefersReducedMotion) {
//   gsap.globalTimeline.timeScale(0);
// }

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  lenis.stop();
}

/* ---------------- LENIS SMOOTH SCROLL ---------------- */
const lenis = new Lenis({
  duration: 1.1,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ---------------- SYNC LENIS + GSAP ---------------- */
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/* ---------------- PARALLAX BACKGROUNDS ---------------- */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

  gsap.to(".parallax-layer.back", {
    y: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "70% top",
      scrub: true
    }
  });

  gsap.to(".parallax-layer.mid", {
    y: 60,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "70% top",
      scrub: true
    }
  });

  gsap.to(".parallax-layer.front", {
    y: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "70% top",
      scrub: true
    }
  });

}




/* ---------------- SECTION BACKGROUND PARALLAX ---------------- */
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

  gsap.utils.toArray(".section-parallax").forEach(section => {
    const bg = section.querySelector(".section-bg");

    gsap.to(bg, {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

}



/* ---------------- HERO LOAD ---------------- */
gsap.from(".hero h1", {
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

gsap.from(".hero p", {
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: "power3.out",
});

/* ---------------- SECTION REVEAL ---------------- */
gsap.utils.toArray(".section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});



// /* ---------------- MOBILE NAV TOGGLE ---------------- */
// document.addEventListener("DOMContentLoaded", () => {
//   const toggle = document.querySelector(".nav-toggle");
//   const mobileNav = document.querySelector(".nav-mobile");

//   if (!toggle || !mobileNav) return;

//   toggle.addEventListener("click", () => {
//     mobileNav.classList.toggle("active");
//   });
// });

/* ---------------- MOBILE NAV (GSAP + BACKDROP) ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".nav-mobile");
  const backdrop = document.querySelector(".nav-backdrop");

  if (!toggle || !mobileNav || !backdrop) return;

  const links = mobileNav.querySelectorAll("a");
  let isOpen = false;

  const openMenu = () => {
    gsap.to(backdrop, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
      onStart: () => {
        backdrop.style.pointerEvents = "auto";
      }
    });

    gsap.to(mobileNav, {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
      onStart: () => {
        mobileNav.style.pointerEvents = "auto";
      }
    });

    // gsap.from(links, {
    //   y: 10,
    //   opacity: 0,
    //   duration: 0.3,
    //   stagger: 0.05,
    //   delay: 0.1,
    //   ease: "power2.out"
    // });
  };

  const closeMenu = () => {
    gsap.to(mobileNav, {
      autoAlpha: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        mobileNav.style.pointerEvents = "none";
      }
    });

    gsap.to(backdrop, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        backdrop.style.pointerEvents = "none";
      }
    });
  };

  // Toggle button
  toggle.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
    isOpen = !isOpen;
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (!isOpen) return;
      closeMenu();
      isOpen = false;
    });
  });

  // Close when backdrop is clicked
  backdrop.addEventListener("click", () => {
    if (!isOpen) return;
    closeMenu();
    isOpen = false;
  });
});


// -------------------- About section image --------------------
gsap.from(".about-image", {
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%"
  },
  scale: 0.92,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out"
});

// --------------------- Work Experience slider -----------------
// /* ---------------- WORK SLIDER + PROGRESS ---------------- */
// document.addEventListener("DOMContentLoaded", () => {
//   const track = document.querySelector(".work-track");
//   const slides = document.querySelectorAll(".work-slide");
//   const next = document.querySelector(".work-arrow.right");
//   const prev = document.querySelector(".work-arrow.left");

//   const currentEl = document.querySelector(".work-progress .current");
//   const totalEl = document.querySelector(".work-progress .total");

//   if (!track || !slides.length || !next || !prev) return;

//   let index = 0;

//   // Set total count
//   if (totalEl) totalEl.textContent = slides.length;

//   const update = () => {
//     track.style.transform = `translateX(-${index * 100}%)`;
//     if (currentEl) currentEl.textContent = index + 1;
//   };

//   next.addEventListener("click", () => {
//     index = (index + 1) % slides.length;
//     update();
//   });

//   prev.addEventListener("click", () => {
//     index = (index - 1 + slides.length) % slides.length;
//     update();
//   });
// });

/* ---------------- WORK SLIDER + PROGRESS + TINT ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".work-track");
  const slides = document.querySelectorAll(".work-slide");
  const next = document.querySelector(".work-arrow.right");
  const prev = document.querySelector(".work-arrow.left");
  const section = document.querySelector(".work-section");

  const currentEl = document.querySelector(".work-progress .current");
  const totalEl = document.querySelector(".work-progress .total");

  if (!track || !slides.length || !next || !prev || !section) return;

  let index = 0;

  if (totalEl) totalEl.textContent = slides.length;

  const applyTint = () => {
    const tintName = slides[index].dataset.tint;
    section.style.setProperty(
      "--work-tint",
      tintName ? `var(--tint-${tintName})` : "transparent"
    );
  };

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    if (currentEl) currentEl.textContent = index + 1;
    applyTint();
  };

  // initial tint
  applyTint();

  next.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    update();
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
});
