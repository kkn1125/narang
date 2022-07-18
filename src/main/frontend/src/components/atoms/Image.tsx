import React from "react";

interface ImageProp {
  src: string;
  alt: string;
}

function Image({ src, alt }: ImageProp) {
  return (
    <section style={{ height: 500, overflow: "hidden", position: "relative" }}>
      <img
        src={src}
        alt={alt}
        crossOrigin='anonymous'
        width='100%'
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-45%)",
          objectFit: "cover",
        }}
      />
    </section>
  );
}

export default Image;
