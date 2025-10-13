"use client";

import { useState } from 'react';
import { X } from 'lucide-react';

type LightboxProps = {
  src: string;
  alt?: string;
  className?: string;
  caption?: string | null;
};

export function LightboxImage({ src, alt, className, caption }: LightboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border/60"
      >
        <img src={src} alt={alt ?? ''} className="w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white opacity-0 transition group-hover:opacity-100">
          Zoom
        </span>
      </button>
      {caption ? <figcaption className="px-4 py-3 text-sm text-muted">{caption}</figcaption> : null}
      {open ? (
        <div
          className="fixed inset-0 z-[999] flex flex-col bg-black/80 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <img src={src} alt={alt ?? ''} className="max-h-[90vh] max-w-5xl object-contain" />
          </div>
          {caption ? <p className="text-center text-sm text-white/80">{caption}</p> : null}
        </div>
      ) : null}
    </figure>
  );
}
