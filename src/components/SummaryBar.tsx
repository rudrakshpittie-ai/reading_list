import { BookOpen, Bookmark, CheckCircle2 } from 'lucide-react';

interface SummaryBarProps {
  total: number;
  reading: number;
  finished: number;
}

export function SummaryBar({ total, reading, finished }: SummaryBarProps) {
  const items = [
    {
      label: 'Total Books',
      value: total,
      icon: BookOpen,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: Bookmark,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-600',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 flex items-center gap-3"
          >
            <div
              className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}
            >
              <Icon size={18} className={item.iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-none">
                {item.value}
              </p>
              <p className="text-xs text-slate-500 mt-1 truncate">{item.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
