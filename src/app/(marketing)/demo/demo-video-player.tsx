"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

const SKIP_SECONDS = 10;

export default function DemoVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const videoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    if (playing) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing, clearHideTimer]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  const skip = useCallback(
    (seconds: number) => {
      const video = videoRef.current;
      if (!video) return;
      const nextTime = Math.max(0, Math.min(video.currentTime + seconds, video.duration || 0));
      video.currentTime = nextTime;
      setCurrentTime(nextTime);
      setShowControls(true);
      scheduleHide();
    },
    [scheduleHide],
  );

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
    setCurrentTime(video.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  }, []);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const seekTime = (x / rect.width) * video.duration;
      video.currentTime = seekTime;
      setProgress((seekTime / video.duration) * 100);
      setCurrentTime(seekTime);
    },
    [],
  );

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  if (!videoUrl) {
    return (
      <div className="flex aspect-video items-center justify-center bg-[#f7f6f1] p-8 text-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-[#806a1f]">Tailored walkthroughs</p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-[#202421]">See the journey that matters to your customers.</h2>
          <p className="mt-4 leading-7 text-[#626a63]">We’ll walk through consumer or SME scenarios using a setup tailored to your institution’s questions and data context.</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-lg bg-[#b89a32] px-5 py-3 font-semibold text-[#171914]">Arrange a walkthrough</Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-video cursor-pointer bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="h-full w-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        preload="metadata"
        playsInline
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
      >
        <track kind="captions" />
      </video>

      <div
        className={`absolute inset-0 flex flex-col justify-between bg-black/20 p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-start justify-between">
          <span className="rounded bg-black/60 px-2 py-1 font-mono text-xs text-white">Demo</span>
        </div>

        {!playing && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Play className="ml-1 h-8 w-8 fill-white text-white" />
            </div>
          </div>
        )}

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="mb-2 flex items-center gap-3">
            <div
              className="flex-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleSeek(e);
              }}
            >
              <div className="h-1 w-full rounded bg-white/30">
                <div
                  className="h-full rounded bg-white transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(-SKIP_SECONDS);
                }}
                className="flex items-center gap-1 rounded p-1.5 text-xs text-white transition-colors hover:bg-white/20"
                aria-label={`Rewind ${SKIP_SECONDS} seconds`}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="font-mono text-[10px]">{SKIP_SECONDS}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="rounded p-1.5 text-white transition-colors hover:bg-white/20"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  skip(SKIP_SECONDS);
                }}
                className="flex items-center gap-1 rounded p-1.5 text-xs text-white transition-colors hover:bg-white/20"
                aria-label={`Forward ${SKIP_SECONDS} seconds`}
              >
                <RotateCw className="h-4 w-4" />
                <span className="font-mono text-[10px]">{SKIP_SECONDS}</span>
              </button>
            </div>

            <div className="font-mono text-[11px] text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        video::-webkit-media-controls {
          overflow: hidden !important;
        }
        video::-webkit-media-controls-enclosure {
          width: calc(100% + 32px);
          margin-left: auto;
        }
        video::-webkit-media-controls-download-button {
          display: none !important;
          -webkit-appearance: none;
        }
        video::-internal-media-controls-download-button {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
