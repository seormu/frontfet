import { Injectable } from '@angular/core';
import { ProyectosService } from '../services/proyectos/proyectos.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from '../interfaces/proyectos';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProyectosResolverService {

  constructor(
    private readonly proyectoService: ProyectosService
  ) { }

  resolve( route: ActivatedRouteSnapshot): Observable<Proyecto> | Promise<Proyecto> | Proyecto {
    const idProyecto: string = route.paramMap.get('id-proyecto');
    return this.proyectoService.consultarProyecto(idProyecto)
      .pipe(
        tap((proyecto: Proyecto) => {
          this.proyectoService.definirDetalleProyecto(proyecto);
        })
      )
  }
}
