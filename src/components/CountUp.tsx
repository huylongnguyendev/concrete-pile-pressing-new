import type { QuickStat } from "#/data/hero.data";
import { useCountUp } from "#/hooks/use-count-up";

export function CountUp({ item, index }: { item: QuickStat; index: number }) {
  const { count, setElementRef } = useCountUp({
    value: item.number,
    delay: 1200 + index * 100,
  });
  const Icon = item.icon;
  return (
    <>
      <div
        ref={setElementRef}
        className="flex items-center gap-1.5 text-primary font-bold text-xl sm:text-2xl"
      >
        <Icon className="w-5 h-5 shrink-0 hidden sm:block" />
        <span>
          {count}
          {item.prefix}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-gray-500 mt-0.5">
        {item.label}
      </span>
    </>
  );
}
