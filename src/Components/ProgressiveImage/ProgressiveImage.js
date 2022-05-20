import { useState, useEffect } from "react";

const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {

    const [imgSrc, setImgSrc] = useState(placeholderSrc);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);

    return (
        imgSrc
            ? <img
                {...{ src: imgSrc, ...props }}
                alt={props.alt || ""}
                className="image"
            />
            : props.preloadElement
    );
};

export default ProgressiveImg;