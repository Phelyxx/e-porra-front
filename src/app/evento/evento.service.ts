import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento, Competidor } from './evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private backUrl: string = "http://127.0.0.1:5000//"

  constructor(private http: HttpClient) { }

  getEventos(usuario: number, token: string): Observable<Evento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Evento[]>(`${this.backUrl}/eventos`, { headers: headers })
  }

  crearEvento(idUsuario: number, token: string, evento: Evento): Observable<Evento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<Evento>(`${this.backUrl}/usuario/${idUsuario}/eventos`, evento, { headers: headers })
  }

  getEvento(idEvento: number, token: string): Observable<Evento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Evento>(`${this.backUrl}/evento/${idEvento}`, { headers: headers })
  }

  editarEvento(token: string, idEvento: number, evento: Evento): Observable<Evento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Evento>(`${this.backUrl}/evento/${idEvento}`, evento, { headers: headers })
  }

  eliminarEvento(token: string, idEvento: number): Observable<Evento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete<Evento>(`${this.backUrl}/evento/${idEvento}`, { headers: headers })
  }

  actualizarGanador(token: string, idCompetidor: number): Observable<Competidor> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<Competidor>(`${this.backUrl}/evento/${idCompetidor}/terminacion`, { headers: headers })
  }

  verReporteEvento(token: string, idEvento: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Object>(`${this.backUrl}/evento/${idEvento}/reporte`, { headers: headers })
  }

}
