"use client";
import React, { useState, useRef } from "react";

const Hero = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    "/videos/video1.mp4",
    "/videos/video-kanatak2.mp4",
    "/videos/news-video.mp4",
  ];

  // Agle video par jaane ka function
  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // Jab videoIndex change ho, tab naya video play karein
  // Note: 'loop' hatana zaroori hai taaki 'onEnded' trigger ho sake
  React.useEffect(() => {
    const currentVideo = videoRefs.current[videoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [videoIndex]);

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* ── VIDEOS ── */}
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          muted
          playsInline
          // loop={false} // Loop false hona chahiye taaki onEnded chale
          onEnded={handleVideoEnd} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            opacity: i === videoIndex ? 1 : 0,
            zIndex: i === videoIndex ? 1 : 0,
            // filter: "brightness(0.6)", // Optional: thoda dark background ke liye
          }}
        />
      ))}

      {/* ── INDICATORS ── */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIndex(i)}
            className="transition-all duration-300"
            style={{
              width: i === videoIndex ? "32px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: i === videoIndex ? "#f97316" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* ── SCROLL DECORATION ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent animate-pulse"></div>
        <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;