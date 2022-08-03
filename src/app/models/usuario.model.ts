export class Usuario {

  static fromFirebase( email: any, uid: any, nombre: any ) {
    return new Usuario(uid, nombre, email);
  }

  constructor(
    public uid: string | undefined,
    public nombre: string | null | undefined,
    public email: string | null | undefined
  ) {}
}