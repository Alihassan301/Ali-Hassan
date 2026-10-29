import React from "react";

/** Static SVG version of the hero sculpture for devices without WebGL. */
export function SculptureFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-[2vw]" aria-hidden="true">
      <svg viewBox="0 0 600 600" className="h-[78%] w-auto max-w-[70%] translate-x-[8%] md:max-w-[58%]">
        <ellipse cx="300" cy="300" rx="250" ry="88" transform="rotate(-22 300 300)" fill="none" stroke="#315EF7" strokeWidth="2" />
        <ellipse cx="300" cy="300" rx="280" ry="70" transform="rotate(18 300 300)" fill="none" stroke="#3730A3" strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="300" cy="300" r="190" fill="none" stroke="#3730A3" strokeOpacity="0.12" />
        <polygon points="150,190 190,120 230,190 190,260" fill="#8B5CF6" />
        <polygon points="420,400 470,430 430,480" fill="#8B5CF6" opacity="0.85" />
        <circle cx="320" cy="290" r="110" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.08" />
        <circle cx="290" cy="255" r="26" fill="#FFFFFF" />
        <circle cx="160" cy="390" r="44" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.08" />
        <circle cx="470" cy="190" r="30" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.08" />
        <circle cx="230" cy="470" r="16" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.1" />
        <circle cx="500" cy="300" r="5" fill="#315EF7" />
        <circle cx="110" cy="280" r="4" fill="#3730A3" />
      </svg>
    </div>);

}