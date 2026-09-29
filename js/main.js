// Mobile navigation toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  const nav = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

// If an image file is missing, hide the broken-image icon.
document.querySelectorAll("img").forEach((img) => {
  const markMissing = () => img.classList.add("img-missing");
  if (img.complete && img.naturalWidth === 0) markMissing();
  else img.addEventListener("error", markMissing);
});

// Rows marked .marquee scroll slowly and endlessly to the left.
const MARQUEE_SPEED = 40; // pixels per second

document.querySelectorAll(".marquee").forEach((row) => {
  const track = document.createElement("div");
  track.className = "marquee__track";
  track.append(...row.children);
  row.append(track);

  // Repeat the items until one set is wider than the widest likely screen,
  // then duplicate that set so shifting by -50% loops without a jump.
  const originals = [...track.children];
  const minWidth = Math.max(row.clientWidth, window.screen.width, 1440);
  while (track.scrollWidth < minWidth) {
    originals.forEach((item) => track.append(cloneHidden(item)));
  }
  [...track.children].forEach((item) => track.append(cloneHidden(item)));

  // Half speed for visitors who turned on "Reduce motion".
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speed = reduce ? MARQUEE_SPEED / 2 : MARQUEE_SPEED;
  const setWidth = track.scrollWidth / 2;
  track.style.animationDuration = `${setWidth / speed}s`;
});

function cloneHidden(node) {
  const clone = node.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  if (clone.matches("a")) clone.tabIndex = -1;
  return clone;
}

// Fade sections in as they scroll into view. Siblings that reveal together
// get a small stagger so cards appear one after another.
const revealEls = document.querySelectorAll("[data-reveal]");
revealEls.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
  const index = siblings.indexOf(el);
  if (index > 0) el.style.setProperty("--delay", `${Math.min(index, 6) * 0.08}s`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Stats count up from 0 when they come into view.
const counters = document.querySelectorAll("[data-count]");
if ("IntersectionObserver" in window) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.5 });
  counters.forEach((el) => countObserver.observe(el));
}

function countUp(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Contact form: there is no server, so open the visitor's email app with
// the message filled in.
document.querySelectorAll("form[data-mailto]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `GRIT website: ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}\n${data.get("phone") || ""}`;
    window.location.href =
      `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
