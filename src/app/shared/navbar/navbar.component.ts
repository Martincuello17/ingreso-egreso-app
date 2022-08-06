import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  user?: Usuario;
  userSubscription?: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.user = user;
    }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
