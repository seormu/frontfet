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
    private readonly Http: HttpClient
  ) { }

  consultarProgramas(): Observable<Programas[]> {
    return this.Http.get<Programas[]>(this.URL+'/programas')
  }
}
