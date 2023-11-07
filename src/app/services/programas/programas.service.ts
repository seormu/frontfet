import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Programas } from 'src/app/interfaces/programas';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  private URL = 'http://localhost:9000';

  constructor(
    private readonly http: HttpClient
  ) { }

  consultarProgramas(): Observable<Programas[]> {
    return this.http.get<Programas[]>(this.URL+'/programas')
  }

  consultarCantidadProgramas(): Observable<String> {
    return this.http.get<string>(this.URL+'/programas/cantidad');
  }
}
