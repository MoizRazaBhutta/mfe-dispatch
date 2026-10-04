import { Routes } from '@angular/router';

export const routes: Routes = [
  // Empty path matches the base /dispatch
  { path: '', loadComponent: () => import('./app').then((m) => m.App) },
  { path: '**', redirectTo: '' }
];
