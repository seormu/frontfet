import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Proyecto, GuardarProyecto, ListaProyectos } from 'src/app/interfaces/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private URL = "http://localhost:9000/";
  private detalleProyecto: Proyecto;
  private _detalleProyecto$ = new ReplaySubject<Proyecto>(1);

  constructor(
    private readonly http: HttpClient
  ) { }

  definirDetalleProyecto(proyecto: Proyecto): void {
    this.detalleProyecto = proyecto;
    this._detalleProyecto$.next(proyecto);
  }

  get detalleProyecto$(): Observable<Proyecto>{
    return this._detalleProyecto$.asObservable();
  }

  consultarProyectos(): Observable<ListaProyectos[]> {
    return this.http.get<ListaProyectos[]>(this.URL+'listarProyectos');
  }

  guardarProyecto(body: any): Observable<GuardarProyecto>{
    return this.http.post<GuardarProyecto>(this.URL+'guardar-proyecto',body)
  }

  actualizarProyecto(body: any, id: string): Observable<GuardarProyecto>{
    return this.http.put<GuardarProyecto>(this.URL+'actualizar/'+id,body)
  }

  filtrarProyectos(filtro: string): Observable<ListaProyectos[]> {
    return this.http.get<ListaProyectos[]>(this.URL+'filtrar/'+filtro);
  }

  consultarProyecto(idproyecto: string): Observable<Proyecto> {
    return this.http.get<Proyecto>(this.URL+'detalle/'+idproyecto);
  }

  eliminarProyecto(id: string): Observable<void> {
    return this.http.delete<void>(this.URL+'eliminar/'+id);
  }

  consultarCantidadProyectos(): Observable<string> {
    return this.http.get<string>(this.URL+'cantidad-proyectos');
  }

  obtenerGeneradorId(programa: string): Observable<String>{
    return this.http.get<string>(this.URL+'complementarid/'+programa);
  }
}
