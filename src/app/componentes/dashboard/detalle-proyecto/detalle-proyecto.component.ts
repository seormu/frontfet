import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Proyecto } from 'src/app/interfaces/proyectos';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';

declare function perfectScrollBar(): any;
declare function script(): any;

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  proyecto: Proyecto;

  constructor(
    private readonly proyectosServices: ProyectosService,
    private readonly router: Router
  ){
  }

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
  }

  ngOnInit(): void {
    this.proyectosServices.detalleProyecto$.subscribe((proyecto: Proyecto) => {
      this.proyecto = proyecto;
    })
  }

  eliminarProyecto(id: string): void{
    this.proyectosServices.eliminarProyecto(id).subscribe(_ => {
      this.router.navigate(['']);
    })
  }

  actualizar(): void {
    this.router.navigate(['actualizar-proyecto/'.concat(this.proyecto.id)]);
  }

}
