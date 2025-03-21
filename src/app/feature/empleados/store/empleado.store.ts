import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { finalize, mergeMap, of } from "rxjs";
import { inject } from "@angular/core";
import { EmpleadosService } from "../../../service";


export interface EmpleadoState {
  Listempleados: any;
  loading: boolean;
}

const initialState: EmpleadoState = {
  Listempleados: [],
  loading: false
}

export const EMPLEADO_INITIAL_STATE = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => {
    const empleadoService = inject(EmpleadosService);
    return {
      allEmpleados: () => {
        of(patchState(store, { loading: true })).pipe(
          mergeMap(() => empleadoService.allEmpleados()),
          finalize(() => {
            setTimeout(() => {
              patchState(store, { loading: false })
            }, 1000);
          })
        ).subscribe((data) => {
          patchState(store, { Listempleados: data });
        })
      },

      deleteEmpleado: (id: number) => {
        of(patchState(store, { loading: true }))
          .pipe(
            mergeMap(() => empleadoService.delete(id)),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
          .subscribe((resp: any) => {
            const currentEmpleados = store.Listempleados();
            if (!currentEmpleados?.data) return;
            const deleteEmpleado = currentEmpleados.data.filter((empleado: any) => empleado.ide !== resp.data);
            patchState(store, { Listempleados: { ...currentEmpleados, data: deleteEmpleado } });
          });
      }
    }
  })
);
