import { DeleteEmpleadoComponent } from './components/delete-empleado/delete-empleado.component';
import { Component, inject, signal } from '@angular/core';
import { EMPLEADO_INITIAL_STATE } from './store/empleado.store';
import { AddEmpleadoComponent } from "./components/add-empleado/add-empleado.component";

@Component({
  selector: 'app-empleados',
  imports: [DeleteEmpleadoComponent, AddEmpleadoComponent],
  templateUrl: './empleados.component.html',
})
export class EmpleadosComponent {
  empleadoStore = inject(EMPLEADO_INITIAL_STATE)

  constructor() {
    this.empleadoStore.allEmpleados();
  }

  verDetalle(id: number) {
    console.log(id);
  }

  editar(id: number) {
    console.log(id);
  }
}
