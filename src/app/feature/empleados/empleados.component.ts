import { Component, inject, signal } from '@angular/core';
import { EmpleadosService } from '../../service';
import { finalize, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-empleados',
  imports: [],
  templateUrl: './empleados.component.html',
})
export class EmpleadosComponent {

  public readonly loading = signal(false);
  public readonly listEmpleados = signal<any | null>(null);
  private readonly empleadosService = inject(EmpleadosService);


  constructor() {
    this.allEmpleados();
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
  allEmpleados() {
    of(this.loading.set(true)).pipe(
      mergeMap(() => this.empleadosService.allEmpleados()),
      finalize(() => this.loading.set(false))
    ).subscribe(data => {this.listEmpleados.set(data),
      console.log(data);
    });
  }

}
