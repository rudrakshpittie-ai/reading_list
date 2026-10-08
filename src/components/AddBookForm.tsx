import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { ReadingStatus } from '@/types';
import { STATUS_LABELS, STATUS_ORDER } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => void;
  existingTitles: string[];
}

export function AddBookForm({ onAdd, existingTitles }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim().replace(/\s+/g, ' ');
    if (!trimmed) {
      setError('Please enter a book title');
      return;
    }
    if (trimmed.length > 60) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    const isDuplicate = existingTitles.some(
      (t) => t.trim().replace(/\s+/g, ' ').toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      setError('This book is already in your reading list.');
      return;
    }
    onAdd(trimmed, status);
    setTitle('');
    setStatus('want-to-read');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6"
    >
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
        Add a Book
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter book title…"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ReadingStatus)}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition cursor-pointer"
        >
          {STATUS_ORDER.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 font-medium text-white hover:bg-teal-700 active:bg-teal-800 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </form>
  );
}
