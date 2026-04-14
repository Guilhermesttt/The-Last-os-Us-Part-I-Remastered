import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence: string;
  className?: string;
  focusColor?: string;
}

interface RelativeRect {
  width: number;
  left: number;
  bottom: number;
}

export default function TrueFocus({
  sentence,
  className = "",
  focusColor = "#ffffff",
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [focusIndex, setFocusIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<RelativeRect[]>([]);

  const measureRects = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const spans = containerRef.current.querySelectorAll<HTMLSpanElement>("span.word");
    const newRects: RelativeRect[] = Array.from(spans).map((span) => {
      const r = span.getBoundingClientRect();
      return {
        width: r.width,
        left: r.left - containerRect.left,
        bottom: r.bottom - containerRect.top,
      };
    });
    setRects(newRects);
  };

  // Measure on sentence change and on resize
  useEffect(() => {
    measureRects();
    window.addEventListener("resize", measureRects);
    return () => window.removeEventListener("resize", measureRects);
  }, [sentence]);

  // Cycle focus index
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  const current = rects[focusIndex];

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="word relative inline-block text-2xl font-bold uppercase tracking-widest"
          animate={{
            color: index === focusIndex ? focusColor : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}

      {current && (
        <motion.div
          className="absolute h-[2px] bg-white opacity-50 pointer-events-none"
          initial={false}
          animate={{
            width: current.width,
            x: current.left,
            y: current.bottom + 2,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
}
