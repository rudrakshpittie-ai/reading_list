export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  'want-to-read': 'Want to Read',
  reading: 'Reading',
  finished: 'Finished',
};

export const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];

export const FILTER_OPTIONS: { value: 'all' | ReadingStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];
