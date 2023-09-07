import { useState, useEffect } from "react";

function useUnsplashImage(month) {
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	const [unsplashimg, setUnsplashImg] = useState({
		src: undefined,
		alt: undefined,
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			function handleResize() {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}

			window.addEventListener("resize", handleResize);
			handleResize();
			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, []);
	useEffect(() => {
		function getImage() {
			setUnsplashImg({
				src:
					"https://source.unsplash.com/" +
					windowSize.width +
					"x" +
					(windowSize.height * 10) / 100 +
					"/?landscape+" +
					month,
				alt: "random unsplash landscape",
			});
		}

		window.addEventListener("getImage", getImage);
		getImage();

		return () => {
			window.removeEventListener("getImage", getImage);
		};
	}, [windowSize, month]);

	return unsplashimg;
}

export default useUnsplashImage;
