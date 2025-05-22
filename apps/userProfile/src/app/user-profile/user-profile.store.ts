import {
  signalStore,
  withState,
  withProps,
  withMethods,
  withHooks,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import {
  withLoadingState,
  startLoading,
  stopLoading,
} from '@adib-mfe-workspace/ui-features';

import { IUserProfile, IUserProfileState } from './user-profile.model';
import { UserProfileService } from './user-profile.service';

export const UserProfileStore = signalStore(
  { providedIn: 'root' },

  // Initial State
  withState<IUserProfileState>({
    user: null,
    error: null,
  }),

  // Shared loading state feature
  withLoadingState(),

  // Inject service
  withProps(() => ({
    userProfileService: inject(UserProfileService),
  })),

  // Methods
  withMethods(({ userProfileService, ...store }) => ({
    setUser(user: IUserProfile): void {
      patchState(store, { user });
    },

    loadUser: rxMethod<number>((userId$) =>
      userId$.pipe(
        switchMap((userId) => {
          patchState(store, startLoading());

          return userProfileService.getUserById(userId).pipe(
            tapResponse({
              next: (user) => patchState(store, { user }),
              error: (err) =>
                patchState(store, {
                  error: 'Failed to load user profile.',
                }),
              finalize: () => patchState(store, stopLoading()),
            })
          );
        })
      )
    ),
  })),

  // Computed State
  withComputed((store) => ({
    hasError: computed(() => !!store.error()),
    isLoaded: computed(() => !!store.user()),
  })),

  // Auto-load user on store init
  withHooks({
    onInit({ loadUser }) {
      loadUser(1); // Load default user ID
    },
  })
);
