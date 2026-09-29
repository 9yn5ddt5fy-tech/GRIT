// Mobile navigation toggle
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  const nav = document.getElementById(btn.getAttribute("aria-controls"));
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(open));
  });
});

// If an image from assets/img has not been downloaded yet, hide the broken
// image; photo/card containers then show a soft green placeholder (see CSS).
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
