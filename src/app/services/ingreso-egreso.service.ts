import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    delete ingresoEgreso.uid;
    return this.firestore
      .doc(`${this.authService.user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  initIngresosEgresosListener(uid?: string) {
    return this.firestore
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((doc) => {
            return ({
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            });
          });
        })
      );
  }

  borrarIngresoEgreso(uid?: string) {
    return this.firestore.doc(`${this.authService.user.uid}/ingresos-egresos/items/${uid}`).delete();
  }
}
