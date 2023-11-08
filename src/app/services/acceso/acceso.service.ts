import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acceso, ResultadoAcceso } from 'src/app/interfaces/acceso';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private URL = 'http://localhost:9000';

  constructor(
    private readonly http: HttpClient
  ) { }

  iniciarSesion(datos: Acceso): Observable<ResultadoAcceso>{
    return this.http.post<ResultadoAcceso>(this.URL+'/login', datos);
  }
}
