import React from "react";

interface ImageProp {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProp) {
  return (
    <section>
      <img src={src} alt={alt} />
    </section>
  );
}

export default Image;
