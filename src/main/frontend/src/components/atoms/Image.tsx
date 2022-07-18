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
	);
}

export default Image;
