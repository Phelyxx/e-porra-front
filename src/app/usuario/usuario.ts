export class Usuario {
    id: number;
    nombre: string
    albumes: Array<any>
    dinero: number
    usuario: string
    contrasena: string
    eventos: Array<number>

    constructor(
        id: number,
        nombre: string,
        dinero: number,
        usuario: string,
        albumes: Array<any>,
        contrasena: string,
        eventos: Array<number>
    ) {
        this.id = id;
        this.nombre = nombre;
        this.dinero = dinero;
        this.usuario = usuario;
        this.albumes = albumes;
        this.contrasena = contrasena;
        this.eventos = eventos;
    }
}
