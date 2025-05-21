import {
  patchState,
  signalStore,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export const THEME_COOKIE_KEY = 'theme';
export type ThemeMode = 'light' | 'dark';

function getInitialTheme(): ThemeMode {
  const cookieTheme = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${THEME_COOKIE_KEY}=`))
    ?.split('=')[1];
  return cookieTheme === 'dark' ? 'dark' : 'light';
}

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  signalStoreFeature(
    withState<{ theme: ThemeMode }>({
      theme: getInitialTheme(),
    }),
    withMethods((store) => ({
      setTheme(theme: ThemeMode) {
        patchState(store, { theme });
        document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/;`;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(`${theme}`);
      },
      toggleTheme() {
        const newTheme = store.theme() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
      },
    }))
  )
);
