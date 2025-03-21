import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
        loadComponent() {
          return import('./feature/empleados/empleados.component').then(m => m.EmpleadosComponent)
        }
      }
    ]
  }
];
