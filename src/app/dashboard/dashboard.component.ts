import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription?: Subscription;
  ingresosSubscription?: Subscription;
  ingresosEgresos?: any[];

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user.uid !== undefined))
      .subscribe(({ user }) => {
        this.ingresosSubscription = this.ingresoEgresoService
          .initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresos) => {
            this.store.dispatch(setItems({ items: ingresosEgresos }));
          });
      });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }
}
