import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  totalHospitales: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      }));
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire({
          title: 'Hospital borrado',
          text: 'El hospital ha sido eliminado correctamente',
          icon: 'success'
        });
        return true;
      }));
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital/?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
    .pipe(map((resp: any) => resp.hospital));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
        Swal.fire({
          title: 'Hospital Actualizado',
          text: hospital.nombre,
          icon: 'success'
        });
        return resp.hospital;
      }));
  }
}
