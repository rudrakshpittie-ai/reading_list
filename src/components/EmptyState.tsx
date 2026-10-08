import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-5">
        <BookOpen size={28} className="text-teal-500" />
      </div>
      <p className="text-lg font-medium text-slate-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
