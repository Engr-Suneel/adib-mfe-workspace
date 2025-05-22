import {
  signalStoreFeature,
  SignalStoreFeature,
  withComputed,
  withState,
} from '@ngrx/signals';

import { computed, Signal } from '@angular/core';

import { LoadingStateSlice, initialLoadingState } from './loading-state.slice';

type StoreMethod<T = void> = (...args: []) => T;

export function withLoadingState(): SignalStoreFeature<
  {
    state: object;
    props: object;
    methods: Record<string, StoreMethod<boolean>>;
  },
  {
    state: LoadingStateSlice;
    props: {
      isNotLoading: Signal<boolean>;
    };
    methods: Record<string, StoreMethod<boolean>>;
  }
> {
  return signalStoreFeature(
    withState(initialLoadingState),
    withComputed((store) => ({
      isNotLoading: computed(() => !store.isLoading),
    }))
  );
}
