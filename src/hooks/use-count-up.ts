import { useEffect, useState } from "react";

export function useCountUp({
  value,
  fromValue = 0,
  duration = 2000,
  delay = 0,
}: {
  value: number;
  fromValue?: number;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState<number>(fromValue);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsStart(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, setIsStart]);

  useEffect(() => {
    if (!isStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(easeOutQuad(progress) * value);

        setCount(currentCount);

        if (progress < 1) animationFrame = window.requestAnimationFrame(step);
      };

      animationFrame = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [isStart, value, fromValue, duration, delay]);

  return { count, setElementRef };
}
