import { EMPLEADO_INITIAL_STATE, EmpleadoState } from './../../store/empleado.store';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
  });


  public addEmpleado() {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    this.empleadoStore.addEmpleado(this.empleadoForm.value);
  }

}
