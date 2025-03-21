import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { finalize, mergeMap, of } from "rxjs";
import { inject } from "@angular/core";
import { EmpleadosService } from "../../../service";

export interface ModalState {
  isOpen: boolean;
}

export interface EmpleadoState {
  Listempleados: any;
  loading: boolean;
  idEmpleado: number | null;
  modals: Record<string, ModalState>;
}

const initialState: EmpleadoState = {
  Listempleados: [],
  loading: false,
  idEmpleado: null,
  modals: {
    deleteModal: { isOpen: false },
    editModal: { isOpen: false },
    addModal: { isOpen: false },
  },
}

export const EMPLEADO_INITIAL_STATE = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => {
    const empleadoService = inject(EmpleadosService);
    return {
      idEmpleado: (ide: number) => patchState(store, { idEmpleado: ide }),

      openModal: (modalName: string) => {
        patchState(store, {
          modals: {
            ...store.modals(),
            [modalName]: { isOpen: true },
          },
        });
      },

      // Método para cerrar cualquier modal
      closeModal: (modalName: string) => {
        patchState(store, {
          modals: {
            ...store.modals(),
            [modalName]: { isOpen: false },
          },
        });
      },

      isModalOpen: (modalName: string) => {
        return store.modals()[modalName]?.isOpen || false;
      },

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

      deleteEmpleado: () => {
        of(patchState(store, { loading: true }))
          .pipe(
            mergeMap(() => empleadoService.delete(store.idEmpleado()!)),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
          .subscribe((resp: any) => {
            const currentEmpleados = store.Listempleados();
            if (!currentEmpleados?.data) return;
            const deleteEmpleado = currentEmpleados.data.filter((empleado: any) => empleado.ide !== resp.data);
            patchState(store, { modals: { ...store.modals(), deleteModal: { isOpen: false } } });
            patchState(store, { Listempleados: { ...currentEmpleados, data: deleteEmpleado } });
          });
      },

      addEmpleado(dataEmpleado: any) {
        of(patchState(store, { loading: true }))
          .pipe(
            mergeMap(() => empleadoService.addEmpleado(dataEmpleado)),
            finalize(() => {
              patchState(store, { loading: false });
            })
          )
          .subscribe((resp: any) => {
            console.log(resp);
            const currentEmpleados = store.Listempleados();
            if (!currentEmpleados?.data) return;
            const addEmpleado = [...currentEmpleados.data, dataEmpleado];
            patchState(store, { modals: { ...store.modals(), addModal: { isOpen: false } } });
            patchState(store, { Listempleados: { ...currentEmpleados, data: addEmpleado } });
          });
      },
      // updateEmpleado(ide: any) {
      //   of(patchState(store, { loading: true }))
      //     .pipe(
      //       mergeMap(() => empleadoService.updateEmpleado(dataEmpleado)),
      //       finalize(() => {
      //         patchState(store, { loading: false });
      //       })
      //     )
      //     .subscribe((resp: any) => {
      //       console.log(resp);
      //       const currentEmpleados = store.Listempleados();
      //       if (!currentEmpleados?.data) return;
      //       const addEmpleado = [...currentEmpleados.data, dataEmpleado];
      //       patchState(store, { modals: { ...store.modals(), editModal: { isOpen: false } } });
      //       patchState(store, { Listempleados: { ...currentEmpleados, data: addEmpleado } });
      //     });
      // },
    }
  })
);
