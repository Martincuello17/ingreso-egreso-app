import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSuscription: Subscription | undefined;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.userSuscription = this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.firestore.doc<Usuario>(fuser.uid + '/usuario').valueChanges()
        .subscribe(usuario => {
          const user = Usuario.fromFirebase(usuario?.email, usuario?.uid, usuario?.nombre);
          this.store.dispatch(authActions.setUser({ user }));
        })
      } else {
        this.userSuscription?.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user?.uid, nombre, user?.email);
        return this.firestore.doc(user?.uid + '/usuario').set({...newUser});
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map((fbUser) => {
        if (fbUser === null) {
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
