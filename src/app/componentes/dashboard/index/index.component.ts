import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/interfaces/proyectos';
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

  constructor(
    private readonly proyectosService: ProyectosService,
    private readonly router: Router
  ){}

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
    this.consultarProyectos();
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
