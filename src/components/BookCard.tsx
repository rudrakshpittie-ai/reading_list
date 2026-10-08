import { Trash2, ChevronDown } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER } from '@/types';

const STATUS_STYLES: Record<ReadingStatus, { badge: string; dot: string }> = {
  'want-to-read': {
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-400',
  },
  reading: {
    badge: 'bg-sky-100 text-sky-700',
    dot: 'bg-sky-400',
  },
  finished: {
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-400',
  },
};

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const styles = STATUS_STYLES[book.status];

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow">
<div className="flex items-start gap-3 mb-4">
        <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" />
        <h3 className="text-base font-semibold text-slate-800 leading-snug break-words">
          {book.title}
        </h3>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
        >
          <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
          {STATUS_LABELS[book.status]}
        </span>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={book.status}
              onChange={(e) => onStatusChange(book.id, e.target.value as ReadingStatus)}
              className="appearance-none rounded-lg border border-slate-200 pl-3 pr-8 py-1.5 text-xs font-medium text-slate-600 bg-white hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer transition"
            >
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
          <button
            onClick={() => onRemove(book.id)}
            aria-label="Delete book"
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
