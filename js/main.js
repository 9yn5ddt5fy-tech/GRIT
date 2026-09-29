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
