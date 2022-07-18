import React from "react";
import Title from "./Title";

interface ImageProp {
	src: string;
	alt: string;
}

function Image({ src, alt }: ImageProp) {
	return (
		<section
			style={{
				height: 550,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
				display: "grid",
				placeItems: "center",
				backgroundImage: `url(${src})`,
			}}>
			<Title title='Introduction' titleColor='white' />
		</section>
		// <section style={{ height: 500, overflow: "hidden", position: "relative" }}>
		//   <img
		//     src={src}
		//     alt={alt}
		//     crossOrigin='anonymous'
		//     width='100%'
		//     style={{
		//       position: "absolute",
		//       top: "50%",
		//       transform: "translateY(-45%)",
		//       objectFit: "cover",
		//     }}
		//   />
		// </section>
	);
}

export default Image;
