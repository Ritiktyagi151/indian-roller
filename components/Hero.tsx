"use client";
import React, { useState, useRef, useEffect } from "react";

const Hero = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // ── DESKTOP VIDEOS ──
  const desktopVideos = [
    "/videos/home.mp4",
    // "/videos/video-kanatak2.mp4",
    "/videos/news-video.mp4",
  ];

  // ── MOBILE VIDEOS ── (alag videos mobile ke liye)
  const mobileVideos = [
    "/videos/mobile-video1.mp4",
    "/videos/mobile-video2.mp4",
    "/videos/mobile-video3.mp4",
  ];

  const videos = isMobile ? mobileVideos : desktopVideos;

  // ── SCREEN SIZE DETECT ──
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── RESET INDEX ON SCREEN SWITCH ──
  useEffect(() => {
    setVideoIndex(0);
  }, [isMobile]);

  // ── NEXT VIDEO ──
  const handleVideoEnd = () => {
    setVideoIndex((prev) => (prev + 1) % videos.length);
  };

  // ── PLAY ON INDEX CHANGE ──
  useEffect(() => {
    const currentVideo = videoRefs.current[videoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [videoIndex, isMobile]);

  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden bg-black"
      style={{ height: isMobile ? "60vh" : "100vh" }}
    >
      {/* ── VIDEOS ── */}
      {videos.map((src, i) => (
        <video
          key={`${isMobile ? "mob" : "desk"}-${src}`}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          muted
          playsInline
          autoPlay={i === 0}
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-fill transition-opacity duration-1000"
          style={{
            opacity: i === videoIndex ? 1 : 0,
            zIndex: i === videoIndex ? 1 : 0,
          }}
        />
      ))}

      {/* ── INDICATORS ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-2 z-20"
        style={{ bottom: isMobile ? "48px" : "96px" }}
      >
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setVideoIndex(i)}
            className="transition-all duration-300"
            style={{
              width: i === videoIndex ? (isMobile ? "24px" : "32px") : (isMobile ? "6px" : "8px"),
              height: isMobile ? "6px" : "8px",
              borderRadius: "4px",
              backgroundColor:
                i === videoIndex ? "#f97316" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* ── SCROLL DECORATION ── (only on desktop) */}
      {!isMobile && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
          <span className="text-white/40 text-[9px] font-bold tracking-widest uppercase">
            Scroll
          </span>
        </div>
      )}
    </section>
  );
};

export default Hero;