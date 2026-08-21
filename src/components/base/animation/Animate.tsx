import type React from "react";
import { useEffect, useRef, useState } from "react";

interface AnimateProps extends React.ComponentProps<"div"> {
  initial?: React.CSSProperties;
  animate?: React.CSSProperties;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
  threshold?: number;
  once?: boolean;
}

export function Animate({
  children,
  initial = { opacity: 0, transform: "translateY(20px)" },
  animate = { opacity: 1, transform: "translateY(0)" },
  transition = { duration: 0.7, delay: 0, ease: "ease-out" },
  threshold = 0.1,
  once = true,
  style,
  className,
  ...props
}: AnimateProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const duration = transition.duration ?? 0.7;
  const delay = transition.delay ?? 0;
  const ease = transition.ease ?? "ease-out";
  const transitionStyle = `all ${duration}s ${ease} ${delay}s`;

  const currentStyle: React.CSSProperties = {
    ...(isInView ? animate : initial),
    transition: transitionStyle,
    ...style,
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(element);
        } else if (!once) setIsInView(false);
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);

  return (
    <div ref={ref} style={currentStyle} className={className} {...props}>
      {children}
    </div>
  );
}
