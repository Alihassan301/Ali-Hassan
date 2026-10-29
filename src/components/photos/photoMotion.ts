import type { CSSProperties } from "react";
import type { PhotoLayout } from "../../types/content";

export interface SceneMotion {
  from: {scale: number;xPercent: number;yPercent: number;rotate: number;borderRadius: string;};
  toRadius: string;
  img: {scale: number;yPercent: number;};
  mobileX: number;
  captionAt: number;
}

export interface SceneLayout {
  grid: string;
  frameWrap: string;
  frameClass: string;
  frameStyle: CSSProperties;
  caption: string;
  numeral: string;
  lines: {x1: number;y1: number;x2: number;y2: number;}[];
}

/** Each photograph gets its own entrance — start position, crop, radius and caption timing. */
export const PHOTO_MOTION: Record<PhotoLayout, SceneMotion> = {
  "portrait-left": {
    from: { scale: 0.26, xPercent: 80, yPercent: 8, rotate: 0, borderRadius: "400px 400px 400px 400px" },
    toRadius: "6px 6px 6px 6px",
    img: { scale: 1.45, yPercent: -10 },
    mobileX: 12,
    captionAt: 0.5
  },
  "portrait-right": {
    from: { scale: 0.3, xPercent: -70, yPercent: 35, rotate: 5, borderRadius: "24px 24px 24px 24px" },
    toRadius: "600px 600px 6px 6px",
    img: { scale: 1.35, yPercent: 8 },
    mobileX: -12,
    captionAt: 0.4
  },
  "landscape-center": {
    from: { scale: 0.22, xPercent: -20, yPercent: -15, rotate: -9, borderRadius: "32px 32px 32px 32px" },
    toRadius: "6px 6px 6px 6px",
    img: { scale: 1.5, yPercent: 6 },
    mobileX: 0,
    captionAt: 0.6
  },
  "square-left": {
    from: { scale: 0.32, xPercent: 95, yPercent: 0, rotate: 0, borderRadius: "600px 600px 600px 600px" },
    toRadius: "6px 6px 6px 6px",
    img: { scale: 1.3, yPercent: -6 },
    mobileX: 10,
    captionAt: 0.45
  },
  "full-bleed": {
    from: { scale: 0.2, xPercent: 0, yPercent: 10, rotate: 0, borderRadius: "40px 40px 40px 40px" },
    toRadius: "0px 0px 0px 0px",
    img: { scale: 1.6, yPercent: 0 },
    mobileX: 0,
    captionAt: 0.65
  }
};

export const PHOTO_LAYOUT: Record<PhotoLayout, SceneLayout> = {
  "portrait-left": {
    grid: "md:grid md:grid-cols-12 md:items-center md:gap-8",
    frameWrap: "md:col-span-6 md:flex md:justify-end",
    frameClass: "aspect-[4/5]",
    frameStyle: { width: "min(100%, 62vh)" },
    caption: "md:col-span-4 md:col-start-8",
    numeral: "right-[4%] top-[8%]",
    lines: [
    { x1: 52, y1: 50, x2: 64, y2: 50 },
    { x1: 64, y1: 20, x2: 64, y2: 80 }]

  },
  "portrait-right": {
    grid: "md:grid md:grid-cols-12 md:items-center md:gap-8",
    frameWrap: "md:order-2 md:col-span-6 md:col-start-7 md:flex md:justify-start",
    frameClass: "aspect-[3/4]",
    frameStyle: { width: "min(100%, 60vh)" },
    caption: "md:order-1 md:col-span-4 md:col-start-2 md:row-start-1",
    numeral: "left-[4%] bottom-[6%]",
    lines: [
    { x1: 8, y1: 22, x2: 44, y2: 22 },
    { x1: 44, y1: 22, x2: 56, y2: 34 }]

  },
  "landscape-center": {
    grid: "md:relative md:flex md:items-center md:justify-center",
    frameWrap: "md:flex md:justify-center",
    frameClass: "aspect-[16/10]",
    frameStyle: { width: "min(100%, 118vh)" },
    caption: "md:absolute md:bottom-[5vh] md:right-0 md:z-10 md:max-w-sm md:bg-pearl md:p-8",
    numeral: "left-[2%] top-[4%]",
    lines: [
    { x1: 4, y1: 12, x2: 96, y2: 12 },
    { x1: 4, y1: 88, x2: 96, y2: 88 }]

  },
  "square-left": {
    grid: "md:grid md:grid-cols-12 md:items-center md:gap-8",
    frameWrap: "md:col-span-5 md:col-start-2",
    frameClass: "aspect-square",
    frameStyle: { width: "min(100%, 66vh)" },
    caption: "md:col-span-4 md:col-start-8",
    numeral: "right-[6%] bottom-[8%]",
    lines: [
    { x1: 50, y1: 30, x2: 62, y2: 42 },
    { x1: 50, y1: 70, x2: 62, y2: 58 },
    { x1: 62, y1: 42, x2: 62, y2: 58 }]

  },
  "full-bleed": {
    grid: "md:relative",
    frameWrap: "",
    frameClass: "aspect-[4/5] md:aspect-auto md:h-[80vh]",
    frameStyle: { width: "100%" },
    caption: "md:absolute md:bottom-8 md:left-8 md:z-10 md:max-w-md md:bg-pearl md:p-8",
    numeral: "right-[3%] top-[2%]",
    lines: [
    { x1: 2, y1: 6, x2: 20, y2: 6 },
    { x1: 80, y1: 94, x2: 98, y2: 94 }]

  }
};