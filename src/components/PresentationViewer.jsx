import { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PresentationViewer({ src }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const canPrev = pageNum > 1;
  const canNext = numPages > 0 && pageNum < numPages;

  const scale = useMemo(() => {
    const w = wrapRef.current?.clientWidth ?? 1000;
    return Math.max(0.9, Math.min(1.6, w / 820));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapRef.current?.clientWidth]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const task = pdfjsLib.getDocument(src);
        const loaded = await task.promise;
        if (cancelled) return;

        setPdf(loaded);
        setNumPages(loaded.numPages);
        setPageNum(1);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!pdf || !canvasRef.current) return;

      setLoading(true);
      const page = await pdf.getPage(pageNum);
      if (cancelled) return;

      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      await page.render({ canvasContext: ctx, viewport }).promise;
      if (!cancelled) setLoading(false);
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [pdf, pageNum, scale]);

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => setPageNum((p) => Math.max(1, p - 1))}
          className={[
            "cp-btn-strong rounded-lg px-3 py-1.5 text-xs text-neutral-100",
            !canPrev ? "opacity-40 cursor-not-allowed" : "",
          ].join(" ")}
        >
          Prev
        </button>

        <button
          type="button"
          disabled={!canNext}
          onClick={() => setPageNum((p) => Math.min(numPages, p + 1))}
          className={[
            "cp-btn-strong rounded-lg px-3 py-1.5 text-xs text-neutral-100",
            !canNext ? "opacity-40 cursor-not-allowed" : "",
          ].join(" ")}
        >
          Next
        </button>

        <div className="ml-2 text-xs text-white/60">
          {numPages ? (
            <>
              Page <span className="text-white/90">{pageNum}</span> /{" "}
              <span className="text-white/90">{numPages}</span>
            </>
          ) : (
            "Loading…"
          )}
        </div>

        {loading ? (
          <div className="ml-auto text-xs text-white/50">Rendering…</div>
        ) : (
          <div className="ml-auto text-xs text-white/40"> </div>
        )}
      </div>

      <div
        ref={wrapRef}
        className="no-scrollbar mt-3 overflow-auto rounded-xl border border-white/10 bg-black/25"
        style={{ maxHeight: "520px" }}
      >
        <div className="flex justify-center p-3">
          <canvas ref={canvasRef} className="block rounded-lg" />
        </div>
      </div>
    </div>
  );
}