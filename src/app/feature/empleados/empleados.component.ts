import { Component, inject, signal } from '@angular/core';
import { EMPLEADO_INITIAL_STATE } from './store/empleado.store';

@Component({
  selector: 'app-empleados',
  imports: [],
  templateUrl: './empleados.component.html',
})
export class EmpleadosComponent {

  public readonly loading = signal(false);
  public readonly listEmpleados = signal<any | null>(null);


  public readonly isOpen = signal(false);


  empleadoStore= inject(EMPLEADO_INITIAL_STATE)

  openModal() {
    this.isOpen.set(true);
  }

  closeModal() {
    this.isOpen.set(false);
  }


  constructor() {
    this.empleadoStore.allEmpleados();
  }

  verDetalle(id: number) {
    console.log(id);
  }

  editar(id: number) {
    console.log(id);
  }

  eliminar(id: number) {
    console.log(id);
  }


}
