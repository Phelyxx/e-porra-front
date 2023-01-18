import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private backUrl: string = "http://127.0.0.1:5000//"

    constructor(private http: HttpClient) { }

    userLogIn(usuario: string, contrasena: string): Observable<any> {
        return this.http.post<any>(`${this.backUrl}/login`, { "usuario": usuario, "contrasena": contrasena});
    }

    userSignUp(usuario: string, contrasena: string, admin: boolean): Observable<any> {
        console.log(admin)
        return this.http.post<any>(`${this.backUrl}/signin`, { "usuario": usuario, "contrasena": contrasena, "admin": admin})
    }

    getUsuario(token: string, usuarioId: number): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        return this.http.get<any>(`${this.backUrl}/usuario/${usuarioId}`, { headers: headers });
    }

    setDinero(token: string, usuarioId: number, usuario: Usuario): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        return this.http.put<any>(`${this.backUrl}/usuario/${usuarioId}/dinero`, usuario, { headers: headers });
    }
}
