import { useMemo } from 'react';
import { Library } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterBar } from '@/components/FilterBar';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { SummaryBar } from '@/components/SummaryBar';

type FilterValue = 'all' | ReadingStatus;

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('reading-list-books', []);
  const [filter, setFilter] = useLocalStorage<FilterValue>('reading-list-filter', 'all');

  function addBook(title: string, status: ReadingStatus) {
    const book: Book = {
      id: crypto.randomUUID(),
      title,
      status,
      addedAt: Date.now(),
    };
    setBooks((prev) => [book, ...prev]);
  }

  function changeStatus(id: string, status: ReadingStatus) {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function removeBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      all: books.length,
      'want-to-read': 0,
      reading: 0,
      finished: 0,
    };
    for (const b of books) c[b.status]++;
    return c;
  }, [books]);

  const visibleBooks = useMemo(() => {
    const filtered = filter === 'all' ? books : books.filter((b) => b.status === filter);
    return [...filtered].sort((a, b) => b.addedAt - a.addedAt);
  }, [books, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
            <Library size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Reading List</h1>
            <p className="text-sm text-slate-500">Track books you want to read, are reading, or have finished.</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <AddBookForm onAdd={addBook} existingTitles={books.map((b) => b.title)} />

        {books.length > 0 && (
          <>
            <SummaryBar
              total={counts.all}
              reading={counts.reading}
              finished={counts.finished}
            />
            <FilterBar active={filter} counts={counts} onChange={setFilter} />
          </>
        )}

        {books.length === 0 ? (
          <EmptyState />
        ) : visibleBooks.length === 0 ? (
          <p className="text-center py-16 text-slate-400">
            No books in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onStatusChange={changeStatus}
                onRemove={removeBook}
              />
            ))}
          </div>
        )}
      </main>

      {books.length > 0 && (
        <footer className="max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <p className="text-center text-xs text-slate-400">
            {books.length} {books.length === 1 ? 'book' : 'books'} in your list
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
