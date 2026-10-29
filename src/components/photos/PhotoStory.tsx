import React from "react";
import { SectionHeader } from "../SectionHeader";
import { Accent } from "../Accent";
import { PhotoScene } from "./PhotoScene";
import { photos } from "../../data/photos";

export function PhotoStory() {
  return (
    <section id="identity" aria-labelledby="identity-title" className="relative w-full bg-ivory pb-16 pt-24 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 md:px-10 lg:grid-cols-12">
        <SectionHeader
          id="identity-title"
          label="01 / Visual Identity"
          className="lg:col-span-8"
          title={
          <>
              Five Perspectives. <Accent>One</Accent> Identity.
            </>
          } />
        
        <p className="max-w-sm self-end text-[17px] leading-relaxed text-graphite/70 lg:col-span-3 lg:col-start-10">
          Five art-directed looks, each tied to a piece of the personal brand. Keep scrolling — every photograph grows into
          its place.
        </p>
      </div>

      <div className="mt-8 md:mt-0">
        {photos.map((photo, i) =>
        <PhotoScene key={photo.id} photo={photo} order={i} />
        )}
      </div>
    </section>);

}