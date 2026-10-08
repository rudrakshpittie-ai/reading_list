import type { ReadingStatus } from '@/types';
import { FILTER_OPTIONS } from '@/types';

type FilterValue = 'all' | ReadingStatus;

interface FilterBarProps {
  active: FilterValue;
  counts: Record<FilterValue, number>;
  onChange: (value: FilterValue) => void;
}

export function FilterBar({ active, counts, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {opt.label}
            <span
              className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-semibold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {counts[opt.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
