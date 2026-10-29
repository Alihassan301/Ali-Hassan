import React, { useState } from "react";
import { scheduleRefresh } from "../../utils/gsap";
import type { Photo } from "../../types/content";

interface PhotoFrameProps {
  photo: Photo;
  tone: "lavender" | "ice";
}

/**
 * Renders the real photograph when it exists at photo.src.
 * Until then it shows a clearly labeled, replaceable placeholder — never a stand-in portrait.
 */
export function PhotoFrame({ photo, tone }: PhotoFrameProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const toneBg = tone === "lavender" ? "bg-lavender" : "bg-ice";

  return (
    <>
      <div className={`absolute inset-0 ${toneBg}`} />
      {status === "error" &&
      <div
        role="img"
        aria-label={`Placeholder for photograph ${photo.index}: ${photo.title}. Replace with ${photo.src}`}
        className="absolute inset-0 flex flex-col justify-between p-[7%]">
        
          <div className="flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-royal">
            <span>Photo placeholder</span>
            <span>{photo.index} / 05</span>
          </div>
          <svg viewBox="0 0 200 200" className="mx-auto w-[42%] max-w-[220px]" aria-hidden="true">
            <circle cx="100" cy="100" r="78" fill="none" stroke="#315EF7" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="40" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.12" />
            <line x1="10" y1="100" x2="190" y2="100" stroke="#3730A3" strokeOpacity="0.4" strokeWidth="1" />
            <line x1="100" y1="10" x2="100" y2="190" stroke="#3730A3" strokeOpacity="0.4" strokeWidth="1" />
          </svg>
          <div>
            <p className="font-display text-[clamp(1.1rem,2vw,1.75rem)] font-semibold leading-tight text-graphite">{photo.title}</p>
            <p className="mt-2 break-all font-mono text-[10px] tracking-[0.06em] text-mist">Replace with {photo.src}</p>
          </div>
        </div>
      }
      {status !== "error" &&
      <div data-photo-img className="absolute inset-0 will-change-transform">
          <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            setStatus("loaded");
            scheduleRefresh();
          }}
          onError={() => setStatus("error")}
          className={`h-full w-full object-cover transition-opacity duration-300 ease-out-expo ${
          status === "loaded" ? "opacity-100" : "opacity-0"}`
          }
          style={{ objectPosition: photo.focus }} />
        
        </div>
      }
    </>);

}