import { ModuleFederationConfig, SharedFunction } from '@nx/module-federation';

const sharedFunction: SharedFunction = (libraryName, sharedConfig) => {
  const shareAllSingleton = {
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  };

  const sharedLibs = [
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@adib-mfe-workspace/ui-shared', // your shared library singleton
  ];

  if (sharedLibs.includes(libraryName)) {
    return {
      ...sharedConfig,
      ...shareAllSingleton,
    };
  }

  return false;
};

const config: ModuleFederationConfig = {
  name: 'todoList',
  exposes: {
    './Routes': 'apps/todoList/src/app/remote-entry/entry.routes.ts',
  },
  shared: sharedFunction,
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
