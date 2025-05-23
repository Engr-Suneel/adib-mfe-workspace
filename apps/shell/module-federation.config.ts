import { ModuleFederationConfig, SharedFunction } from '@nx/module-federation';

const sharedFunction: SharedFunction = (libraryName, sharedConfig) => {
  const shareAllSingleton = {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  };

  // List libraries you want to share with custom config
  const sharedLibs = [
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@adib-mfe-workspace/ui-shared',
  ];

  if (sharedLibs.includes(libraryName)) {
    return {
      ...sharedConfig,
      ...shareAllSingleton,
    };
  }

  // For others, no sharing
  return false;
};

const config: ModuleFederationConfig = {
  name: 'shell',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: ['userProfile', 'todoList'],
  shared: sharedFunction,
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
