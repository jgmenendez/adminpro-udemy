import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe(medicos => this.medicos = medicos);
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino)
      .subscribe(medicos => this.medicos = medicos);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borra el médico'
    }).then(borrar => {
      console.log(borrar);

      if (borrar.value) {
        this._medicoService.borrarMedico(medico._id)
          .subscribe(borrado => {
            console.log(borrado);
            this.cargarMedicos();
          });
      }
    });
  }

}
