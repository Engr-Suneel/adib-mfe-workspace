import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'userProfile',
        pathMatch: 'full',
      },
      {
        path: 'userProfile',
        loadChildren: () =>
          import('userProfile/Routes').then((m) => m!.remoteRoutes),
      },
      {
        path: 'todoList',
        loadChildren: () =>
          import('todoList/Routes').then((m) => m!.remoteRoutes),
      },
    ],
  },
];
