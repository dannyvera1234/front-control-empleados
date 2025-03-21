import { DeleteEmpleadoComponent } from './components/delete-empleado/delete-empleado.component';
import { Component, inject, signal } from '@angular/core';
import { EMPLEADO_INITIAL_STATE } from './store/empleado.store';
import { AddEmpleadoComponent } from "./components/add-empleado/add-empleado.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleados',
  imports: [DeleteEmpleadoComponent, AddEmpleadoComponent,RouterLink],
  templateUrl: './empleados.component.html',
})
export class EmpleadosComponent {
  empleadoStore = inject(EMPLEADO_INITIAL_STATE)
  public readonly ideEmpleado = signal<number | null>(null)


  constructor() {
    this.empleadoStore.allEmpleados();
  }

}
