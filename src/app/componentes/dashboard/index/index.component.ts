import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/interfaces/proyectos';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';

declare function perfectScrollBar(): any;
declare function script(): any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  listaProyectos: Proyecto[];
  cantidadProyectos: string;
  cantidadProgramas: string;

  constructor(
    private readonly proyectosService: ProyectosService,
    private readonly router: Router,
    private readonly programasService: ProgramasService
  ){}

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
    this.consultarProyectos();
    this.consultarCantidadProyectos();
    this.consultarCantidadProgramas();
  }

  consultarCantidadProyectos(): void {
    this.proyectosService.consultarCantidadProyectos().subscribe((cantidad:string) => {
      this.cantidadProyectos = cantidad;
    })
  }

  consultarCantidadProgramas(): void {
    this.programasService.consultarCantidadProgramas().subscribe((cantidad: string) => {
      this.cantidadProgramas = cantidad;
    })
  }

  consultarProyectos(): void {
    this.proyectosService.consultarProyectos().subscribe(listaProyectos => {
      this.listaProyectos = listaProyectos;
    });
  }

  filtrarProyectos(filtro: string): void{
    if(filtro===''){
      this.consultarProyectos()
    }else{
      this.proyectosService.filtrarProyectos(filtro).subscribe((proyectos: Proyecto[]) => {
        this.listaProyectos = proyectos;
      })
    }
  }

  obtenerProyecto(item: Proyecto): void{
    this.router.navigate([`detalle-proyecto`, item.id]);
  }
}
