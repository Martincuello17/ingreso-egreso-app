import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubscription?: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubscription = this.store.select('ingresosEgresos').subscribe(({items}) => {
      this.ingresosEgresos = items;
    } );
  }

  ngOnDestroy(): void {
    this.ingresosSubscription?.unsubscribe();
  }

  borrarIngreso(uid?: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Eliminado', 'Item eliminado correctamente', 'success');
        console.log('borrado');
      }).catch(error => {
        Swal.fire('Error', 'Error al eliminar el item', 'error');
      } );
  }

}
