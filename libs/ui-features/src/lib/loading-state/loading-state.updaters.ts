import { PartialStateUpdater } from '@ngrx/signals';
import { LoadingStateSlice } from './loading-state.slice';

export function startLoading(): PartialStateUpdater<LoadingStateSlice> {
  return () => ({ isLoading: true });
}

export function stopLoading(): PartialStateUpdater<LoadingStateSlice> {
  return () => ({ isLoading: false });
}

export function toggleLoading(): PartialStateUpdater<LoadingStateSlice> {
  return (state) => ({ isLoading: !state.isLoading });
}
