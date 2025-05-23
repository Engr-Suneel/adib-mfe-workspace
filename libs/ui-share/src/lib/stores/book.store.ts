import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from '../models/book.model';
import { computed } from '@angular/core';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: 'A novel by F. Scott Fitzgerald.',
      price: 10.99,
    },
    {
      id: 2,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: 'A novel by F. Scott Fitzgerald.',
      price: 10.99,
    },
  ],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // 👇 Accessing previously defined state signals and properties.
  withComputed(({ books }) => ({
    booksCount: computed(() => books().length),
    booksById: computed(() => {
      return new Map(books().map((book) => [book.id, book]));
    }),
  })),
  // properties, and methods.
  withMethods((store) => ({
    updateQuery(query: string): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    changeAuthor(id: number, author: string): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({
        books: state.books.map((book) =>
          book.id === id ? { ...book, author } : book
        ),
      }));
    },
    addBook(book: Book): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({
        books: [...state.books, book],
      }));
    },
    removeBook(id: number): void {
      // 👇 Updating state using the `patchState` function.
      patchState(store, (state) => ({
        books: state.books.filter((book) => book.id !== id),
      }));
    },
  }))
);
