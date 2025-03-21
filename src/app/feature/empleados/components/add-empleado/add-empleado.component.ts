import { EMPLEADO_INITIAL_STATE } from './../../store/empleado.store';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadosService } from '../../../../service';

@Component({
  selector: 'app-add-empleado',
  imports: [ReactiveFormsModule],
  templateUrl: './add-empleado.component.html',
})
export class AddEmpleadoComponent {

  private _fb = inject(FormBuilder);
  empleadoStore = inject(EMPLEADO_INITIAL_STATE)

  empleadoForm = this._fb.group({
    nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    sexo: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    salerio: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });


  constructor() {

  }


  public addEmpleado() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }
    this.empleadoStore.addEmpleado(this.empleadoForm.value, this.empleadoForm);
  }
}
