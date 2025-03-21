
import { Route } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { DetailsEmpleadosComponent } from '../details-empleados';

export default [
  {
    path: '',
    component: EmpleadosComponent,
  },
  {
    path: ':ide',
    loadComponent: () =>
      import('../details-empleados').then((m) => m.DetailsEmpleadosComponent)
  },


  { path: '**', redirectTo: '', pathMatch: 'full' },
] satisfies Route[];
