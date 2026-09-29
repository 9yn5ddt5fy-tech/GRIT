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
  const setWidth = () => track.scrollWidth / 2;

  // The row moves on its own, and visitors can also drag / swipe it,
  // scroll it sideways with a trackpad, or use the arrow buttons.
  let offset = 0;
  let remaining = 0; // distance still to travel after an arrow click
  let pausedUntil = 0;
  let last = performance.now();
  const wrap = (x) => {
    const w = setWidth();
    return ((x % w) + w) % w;
  };
  const render = () => (track.style.transform = `translate3d(${-offset}px, 0, 0)`);
  const pause = (ms = 2500) => (pausedUntil = performance.now() + ms);

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (remaining) {
      const move = Math.abs(remaining) < 0.5 ? remaining : remaining * Math.min(1, dt * 8);
      offset += move;
      remaining -= move;
    } else if (!dragging && now > pausedUntil) {
      offset += speed * dt;
    }
    offset = wrap(offset);
    render();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Drag with mouse or finger.
  let dragging = false;
  let startX = 0;
  let startOffset = 0;
  let moved = 0;
  row.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = 0;
    startX = e.clientX;
    startOffset = offset;
    remaining = 0;
    row.classList.add("is-dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    moved = Math.max(moved, Math.abs(dx));
    offset = wrap(startOffset - dx);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    row.classList.remove("is-dragging");
    pause();
    setTimeout(() => (moved = 0), 0);
  };
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  // A drag should not count as a click on a card or photo.
  row.addEventListener("click", (e) => {
    if (moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  row.addEventListener("dragstart", (e) => e.preventDefault());

  // Sideways trackpad / shift+wheel scrolling.
  row.addEventListener("wheel", (e) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!dx) return;
    e.preventDefault();
    remaining = 0;
    offset = wrap(offset + dx);
    pause();
  }, { passive: false });

  // Arrow buttons.
  const step = () => (originals[0] ? originals[0].getBoundingClientRect().width + 24 : 300);
  const makeBtn = (dir, label, text) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `marquee__btn marquee__btn--${dir}`;
    b.setAttribute("aria-label", label);
    b.textContent = text;
    b.addEventListener("pointerdown", (e) => e.stopPropagation());
    b.addEventListener("click", () => {
      remaining += dir === "next" ? step() : -step();
      pause(4000);
    });
    return b;
  };
  row.append(makeBtn("prev", "Scroll left", "‹"), makeBtn("next", "Scroll right", "›"));
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

// Full-screen photo viewer, shared by the album and the photo rows.
// openLightbox(list, i): list is [{ src, alt }]; arrows / swipe / Esc work.
const openLightbox = (() => {
  let box = document.getElementById("lightbox");
  if (!box) {
    box = document.createElement("div");
    box.className = "lightbox";
    box.id = "lightbox";
    box.hidden = true;
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
      '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">‹</button>' +
      '<figure class="lightbox__figure"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">›</button>';
    document.body.append(box);
  }
  const img = box.querySelector("img");
  const caption = box.querySelector("figcaption");
  let list = [];
  let index = 0;
  const show = (i) => {
    index = (i + list.length) % list.length;
    img.classList.remove("img-missing");
    img.src = list[index].src;
    img.alt = list[index].alt;
    caption.textContent = `${list[index].alt ? list[index].alt + " · " : ""}${index + 1} / ${list.length}`;
  };
  const close = () => {
    box.hidden = true;
    document.body.style.overflow = "";
  };
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
  return (items, i) => {
    list = items;
    show(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };
})();

// Photo album: show the first photos, "More photos" reveals the rest.
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
  const list = items.map((item) => ({ src: item.dataset.full, alt: item.querySelector("img").alt }));
  items.forEach((item, i) => item.addEventListener("click", () => openLightbox(list, i)));
});

// Photo rows: clicking a photo opens it full size (a drag does not count).
document.querySelectorAll(".marquee").forEach((row) => {
  const photos = [...row.querySelectorAll(".photo:not([aria-hidden]) img")];
  if (!photos.length) return;
  const list = photos.map((img) => ({ src: img.getAttribute("src"), alt: img.alt }));
  row.addEventListener("click", (e) => {
    const img = e.target.closest(".photo")?.querySelector("img");
    if (!img) return;
    const i = list.findIndex((p) => p.src === img.getAttribute("src"));
    openLightbox(list, Math.max(0, i));
  });
});

// Report flip-book (EDU page). Falls back to a plain grid of pages if the
// page-flip library could not load.
(function initBook() {
  const el = document.getElementById("book");
  if (!el || !window.St) return;
  const pages = el.querySelectorAll(".book__page");
  // Size each page so the whole spread fits on screen (A4 ratio 1 : 1.414).
  const pageH = Math.min(window.innerHeight * 0.78, 900);
  const pageW = Math.round(pageH / 1.414);
  el.style.maxWidth = `${pageW * 2}px`;
  const book = new St.PageFlip(el, {
    width: pageW,
    height: Math.round(pageH),
    size: "stretch",
    minWidth: 240,
    maxWidth: pageW,
    minHeight: 340,
    maxHeight: Math.round(pageH),
    showCover: true,
    usePortrait: true,
    mobileScrollSupport: true,
    maxShadowOpacity: 0.4,
    flippingTime: 700,
  });
  book.loadFromHTML(pages);
  const counter = document.getElementById("book-counter");
  const total = book.getPageCount();
  const update = () => (counter.textContent = `${book.getCurrentPageIndex() + 1} / ${total}`);
  book.on("flip", update);
  update();
  document.querySelector('[data-book="prev"]').addEventListener("click", () => book.flipPrev());
  document.querySelector('[data-book="next"]').addEventListener("click", () => book.flipNext());
  const wrap = el.closest(".book-wrap");
  document.querySelector('[data-book="full"]').addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (wrap.requestFullscreen) wrap.requestFullscreen();
    else if (wrap.webkitRequestFullscreen) wrap.webkitRequestFullscreen();
  });
  document.addEventListener("keydown", (e) => {
    const r = wrap.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    if (e.key === "ArrowRight") book.flipNext();
    if (e.key === "ArrowLeft") book.flipPrev();
  });
})();

// Famous quotes: show one at a time, change every 7 seconds.
// Visitors can also use the dots, the arrows, or swipe.
document.querySelectorAll(".famous").forEach((box) => {
  const items = [...box.querySelectorAll(".famous__item")];
  const dots = [...box.querySelectorAll(".famous__dot")];
  let i = 0;
  let timer;
  const show = (n) => {
    i = (n + items.length) % items.length;
    items.forEach((el, k) => el.classList.toggle("is-active", k === i));
    dots.forEach((el, k) => el.classList.toggle("is-active", k === i));
  };
  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(i + 1), 7000);
  };
  const go = (n) => {
    show(n);
    restart();
  };
  dots.forEach((d, k) => d.addEventListener("click", () => go(k)));
  const nav = box.querySelector(".famous__dots");
  const prev = document.createElement("button");
  const next = document.createElement("button");
  prev.type = next.type = "button";
  prev.className = "famous__arrow";
  next.className = "famous__arrow";
  prev.setAttribute("aria-label", "Previous quote");
  next.setAttribute("aria-label", "Next quote");
  prev.textContent = "‹";
  next.textContent = "›";
  prev.addEventListener("click", () => go(i - 1));
  next.addEventListener("click", () => go(i + 1));
  nav.prepend(prev);
  nav.append(next);
  let sx = null;
  box.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  box.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    sx = null;
  });
  restart();
});
