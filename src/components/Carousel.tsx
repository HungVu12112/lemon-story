import React, {useEffect, useRef, useState} from "react";

interface CarouselProps {
    images: string[];
    interval?: number;
    pauseOnHover?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
                                               images,
                                               interval = 3000,
                                               pauseOnHover = true,
                                           }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<number | null>(null);
    const isMountedRef = useRef(true);

    const startAuto = () => {
        stopAuto();
        if (!images || images.length <= 1) return;
        timerRef.current = window.setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);
    };

    const stopAuto = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        isMountedRef.current = true;
        startAuto();
        return () => {
            isMountedRef.current = false;
            stopAuto();
        };
    }, [images.length, interval]);

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    if (!images || images.length === 0) {
        return <p className="text-center text-gray-500">Không có ảnh để hiển thị</p>;
    }

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => pauseOnHover && stopAuto()}
            onMouseLeave={() => pauseOnHover && startAuto()}
        >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-full object-cover blur-sm transition duration-500 ease-out"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full ${
                            idx === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            <button
                onClick={() => {
                    stopAuto();
                    prevSlide();
                }}
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                aria-label="Previous slide"
            >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50">
          ❮
        </span>
            </button>

            <button
                onClick={() => {
                    stopAuto();
                    nextSlide();
                }}
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                aria-label="Next slide"
            >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 hover:bg-black/50">
          ❯
        </span>
            </button>
        </div>
    );
};

export default Carousel;

