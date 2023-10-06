import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';

declare function perfectScrollBar(): any;
declare function script(): any;

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.css']
})
export class DetalleProyectoComponent implements OnInit {

  constructor(
    private readonly proyectosServices: ProyectosService
  ){
  }

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
  }

  ngOnInit(): void {
    this.proyectosServices.detalleProyecto$.subscribe(res => console.log("resss ", res))
    console.log("detale ", )
    console.log("id",)
  }

}
