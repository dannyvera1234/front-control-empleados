import { Component, inject, Input, signal } from '@angular/core';
import { EmpleadosService } from '../../service';
import { finalize, mergeMap, of } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details-empleados',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './details-empleados.component.html',
})
export class DetailsEmpleadosComponent {
  @Input({ required: true }) set ide(ide: number) {
    this.detailEmpleado(ide);
  }
  private readonly empleadoSerivce = inject(EmpleadosService);
  public readonly loading = signal(false);
  public readonly dataEmpleado = signal<any | null>(null);

  constructor() {

  }



  detailEmpleado(id: number) {
    of(this.loading.set(true)).pipe(
      mergeMap(() => this.empleadoSerivce.detailsEmpleado(id)),
      finalize(() => this.loading.set(false))
    ).subscribe((res: any) => {
      this.dataEmpleado.set(res);
    });
  }
}
