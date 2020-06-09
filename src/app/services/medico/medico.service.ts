import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.medico));
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));
  }

  borrarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire({
          title: 'Médico borrado',
          text: 'El médico ha sido eliminado correctamente',
          icon: 'success'
        });
        return true;
      }));
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
        .pipe(map((resp: any) => {
          Swal.fire({
            title: 'Médico actualizado',
            text: medico.nombre,
            icon: 'success'
          });
          return resp.medico;
        }));
    }
    else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico)
        .pipe(map((resp: any) => {
          Swal.fire({
            title: 'Médico creado',
            text: medico.nombre,
            icon: 'success'
          });
          return resp.medico;
        }));
    }
  }
}
