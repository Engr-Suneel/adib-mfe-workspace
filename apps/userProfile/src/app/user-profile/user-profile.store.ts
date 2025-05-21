import {
  signalStore,
  withState,
  withProps,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { inject } from '@angular/core';
import { tap, catchError, of, switchMap } from 'rxjs';
import { IUserProfile, IUserProfileState } from './user-profile.model';
import { UserProfileService } from './user-profile.service';

export const UserProfileStore = signalStore(
  { providedIn: 'root' },

  withState<IUserProfileState>({
    user: null,
    loading: false,
    error: null,
  }),

  withProps(() => ({
    userProfileService: inject(UserProfileService),
  })),

  withMethods(({ userProfileService, ...store }) => ({
    setUser(user: IUserProfile): void {
      patchState(store, { user });
    },

    // ✅ Correct rxMethod signature using Observable input
    loadUser: rxMethod<number>((userId$) =>
      userId$.pipe(
        tap(() => {
          patchState(store, { loading: true, error: null });
        }),
        switchMap((userId) =>
          userProfileService.getUserById(userId).pipe(
            tap({
              next: (user) => {
                patchState(store, { user, loading: false });
              },
              error: () => {
                patchState(store, {
                  error: 'Failed to load user profile.',
                  loading: false,
                });
              },
            }),
            catchError(() => {
              patchState(store, {
                error: 'Unknown error',
                loading: false,
              });
              return of();
            })
          )
        )
      )
    ),
  })),

  withHooks({
    onInit({ loadUser }) {
      loadUser(1); // load default user
    },
  })
);
