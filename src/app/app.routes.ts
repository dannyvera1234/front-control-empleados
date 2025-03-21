import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'sistema_recursos_humanos/empleados', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.routing'),
  },

  {
    path: 'sistema_recursos_humanos',
    loadComponent() {
      return import('./layout/layout.component').then(m => m.LayoutComponent)
    },
    children: [
      {
        path: 'empleados',
        loadChildren() {
          return import('./feature/empleados/routes').then(m => m.default)
        }
      }
    ]
  }
];
