// Mobile navigation toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  const nav = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

// Home page: the header sits on the hero photo and turns white on scroll.
const overlayHeader = document.querySelector(".site-header--overlay");
if (overlayHeader) {
  const update = () => overlayHeader.classList.toggle("is-scrolled", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

// If an image file is missing, hide the broken-image icon.
document.querySelectorAll("img[src]").forEach((img) => {
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

// Safety net for fast scrolling: anything already above the bottom of the
// screen is shown, even if the observer skipped over it.
let revealQueued = false;
window.addEventListener("scroll", () => {
  if (revealQueued) return;
  revealQueued = true;
  requestAnimationFrame(() => {
    revealQueued = false;
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
    });
  });
}, { passive: true });

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

// Photo album: show the first photos, "More photos" reveals the rest,
// clicking a photo opens it full screen (arrows / swipe / Esc).
document.querySelectorAll("#album").forEach((section) => {
  const items = [...section.querySelectorAll(".album__item")];
  const more = section.querySelector("[data-album-more]");
  const FIRST = 9; // one large photo + eight small ones fill the grid evenly
  if (items.length <= FIRST) {
    more.parentElement.remove();
  } else {
    items.slice(FIRST).forEach((item) => item.classList.add("is-hidden"));
    more.addEventListener("click", () => {
      items.forEach((item) => item.classList.remove("is-hidden"));
      more.parentElement.remove();
    });
  }

  const box = document.getElementById("lightbox");
  if (!box) return;
  const img = box.querySelector("img");
  const caption = box.querySelector("figcaption");
  let index = 0;
  const show = (i) => {
    index = (i + items.length) % items.length;
    const source = items[index].querySelector("img");
    img.classList.remove("img-missing");
    img.src = items[index].dataset.full;
    img.alt = source.alt;
    caption.textContent = `${source.alt} · ${index + 1} / ${items.length}`;
  };
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = "";
  };
  items.forEach((item, i) =>
    item.addEventListener("click", () => {
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
    })
  );
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(index - 1));
  box.querySelector(".lightbox__nav--next").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  let startX = null;
  box.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  box.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
});
