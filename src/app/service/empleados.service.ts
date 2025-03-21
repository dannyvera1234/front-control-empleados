import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  constructor(private _http: HttpClient) { }


  allEmpleados() {
    return this._http.get(`${environment.BASE_API_SISTEMA}/empleados`);
  }

  delete(ide: number) {
    return this._http.delete(`${environment.BASE_API_SISTEMA}/empleados/${ide}`);
  }

  addEmpleado(empleado: any) {
    return this._http.post(`${environment.BASE_API_SISTEMA}/empleados`, empleado);
  }

  detailsEmpleado(ide: number) {
    return this._http.post(`${environment.BASE_API_SISTEMA}/empleados/detailsEmpleado`, { ide });
  }
}
