'use client';
import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 313;
const PARALLEL = 8;

// Must match the height driver in ScrollJourney — used as the primary maxScroll source
// so the canvas covers exactly the full scroll journey regardless of DOM measurement quirks.
const SCROLL_DRIVER_VH = 26;

const FRAME_PATH = (n: number) =>
  `/bg-frames/frame-${String(n).padStart(4, '0')}.jpg`;

export function ScrollVideoBackground() {
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imagesRef       = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef          = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    imagesRef.current = images;

    // ── Canvas sizing (only on mount / resize) ────────────────────────────
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width  = Math.round(window.innerWidth  * (window.devicePixelRatio || 1));
      canvas.height = Math.round(window.innerHeight * (window.devicePixelRatio || 1));
    }

    // ── Draw (falls back to nearest loaded frame) ─────────────────────────
    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      let img = images[index];
      if (!img) {
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          if (index - d >= 0            && images[index - d]) { img = images[index - d]; break; }
          if (index + d < TOTAL_FRAMES  && images[index + d]) { img = images[index + d]; break; }
        }
      }
      if (!img) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    // ── maxScroll: use only the known driver height ────────────────────
    // Math.max(computed, measured) caused video to stop early when the
    // browser reported a larger scrollHeight than expected.
    function getMaxScroll(): number {
      return Math.max((SCROLL_DRIVER_VH - 1) * window.innerHeight, 1);
    }

    // ── Sequential batch loading ──────────────────────────────────────────
    let nextToLoad = 0;

    function loadNext() {
      if (nextToLoad >= TOTAL_FRAMES) return;
      const i = nextToLoad++;
      const img = new Image();
      img.onload = () => {
        images[i] = img;
        if (i === 0) drawFrame(0);
        if (i === currentFrameRef.current) drawFrame(i);
        loadNext();
      };
      img.onerror = () => loadNext();
      img.src = FRAME_PATH(i + 1);
    }

    resizeCanvas();
    for (let i = 0; i < PARALLEL; i++) loadNext();

    // ── Scroll handler ────────────────────────────────────────────────────
    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const maxScroll = getMaxScroll();
        const progress  = Math.min(window.scrollY / maxScroll, 1);
        const frame     = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
        currentFrameRef.current = frame;
        drawFrame(frame);
      });
    }

    function onResize() {
      resizeCanvas();
      drawFrame(currentFrameRef.current);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}
