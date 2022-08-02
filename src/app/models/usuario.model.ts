export class Usuario {
  constructor(
    public uid: string | undefined,
    public nombre: string | null | undefined,
    public email: string | null | undefined
  ) {}
}