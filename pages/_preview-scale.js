/* ===== LIVE PREVIEW SCALING =====
   Each preview wrapper contains a full-size iframe of the real template page.
   We scale it down with CSS transform so it fits the card while staying "live"
   (any change to the template's actual code shows up here automatically,
   no manual screenshots needed). pointer-events:none on the iframe means
   clicks/right-clicks fall through to the <a> wrapping the whole card, so
   "open in new tab" still works normally. */
const PREVIEW_BASE_WIDTH = 1280; // assumed natural width of the template pages

function scalePreview(wrapper) {
  const iframe = wrapper.querySelector('iframe');
  if (!iframe) return;
  const w = wrapper.clientWidth;
  const h = wrapper.clientHeight;
  if (!w || !h) return;
  const scale = w / PREVIEW_BASE_WIDTH;
  iframe.style.width = PREVIEW_BASE_WIDTH + 'px';
  iframe.style.height = (h / scale) + 'px';
  iframe.style.transform = `scale(${scale})`;
}

function initLivePreviews() {
  const wrappers = document.querySelectorAll('.preview-wrapper');
  wrappers.forEach(scalePreview);
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => scalePreview(entry.target));
    });
    wrappers.forEach(w => ro.observe(w));
  } else {
    window.addEventListener('resize', () => wrappers.forEach(scalePreview));
  }
}
