import { Component, inject } from '@angular/core';
import { EMPLEADO_INITIAL_STATE } from '../../store/empleado.store';

@Component({
  selector: 'app-delete-empleado',
  imports: [],
  templateUrl: './delete-empleado.component.html',
})
export class DeleteEmpleadoComponent {
  empleadoStore = inject(EMPLEADO_INITIAL_STATE)
}
