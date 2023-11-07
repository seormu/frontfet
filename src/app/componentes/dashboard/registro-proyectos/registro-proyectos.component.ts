import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FORMATO_NOMBRES_APELLIDOS, SOLO_NUMEROS } from 'src/app/constantes/CaracteresEspeciales';
import { VALIDACIONES_FORMULARIO_GUARDAR_PROYECTO } from 'src/app/constantes/validacionesFormulario';
import { Programas } from 'src/app/interfaces/programas';
import { GuardarProyecto } from 'src/app/interfaces/proyectos';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { ValidacionesService } from 'src/app/services/validaciones/validaciones-service.service';


declare function perfectScrollBar(): any;
declare function script(): any;

@Component({
  selector: 'app-registro-proyectos',
  templateUrl: './registro-proyectos.component.html',
  styleUrls: ['./registro-proyectos.component.css']
})
export class RegistroProyectosComponent implements OnInit {


  formularioProyectos: FormGroup;
  mensajeAlerta: string = '';
  tipoAlerta: string = '';
  listaProgramas: Programas[];
  pronombre: string = '';
  idPrograma: string = '';
  nombrePrograma: string;
  anioProyecto: string = '';
  maximo: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validacionesService: ValidacionesService,
    private readonly proyectosService: ProyectosService,
    private readonly programasService: ProgramasService,
    private readonly router: Router,
    private readonly elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    perfectScrollBar();
    script();
  }

  ngOnInit() {
    this.crearFormulario();
    this.consultarProgramas();

  }

  consultarProgramas(): void {
    this.programasService.consultarProgramas().subscribe((programas: Programas[])=> {
      this.listaProgramas = programas;
    })
  }

  crearFormulario(): void {
    this.formularioProyectos = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.maxLength(15)]],
      programa: ['', [Validators.required]],
      nombreProyecto: ['', [Validators.required, Validators.maxLength(255)]],
      objetivoGeneral: ['', [Validators.required, Validators.maxLength(255)]],
      anio: ['', [Validators.required, Validators.pattern(SOLO_NUMEROS), Validators.maxLength(4)]],
      procedencia: ['', [Validators.required, Validators.maxLength(100)]],
      investigadorUno: ['', [Validators.required, Validators.maxLength(100)]],
      investigadorDos: ['', [Validators.maxLength(100)]],
      investigadorTres: ['', [Validators.maxLength(100)]],
      duracion: ['', [Validators.pattern(SOLO_NUMEROS), Validators.maxLength(10)]],
      valor: ['', [Validators.pattern(SOLO_NUMEROS), Validators.maxLength(10)]],
    });
    this.formularioProyectos.get('codigo').disable()
  }

  campoEsInvalido(nombreCampo: string): boolean {
    return this.validacionesService.campoEsInvalido(this.formularioProyectos, nombreCampo);
  }

  obtenerMensajeErrorCampo(nombreCampo: string): string {
    return this.validacionesService.obtenerMensajeErrorCampo(this.formularioProyectos, nombreCampo, VALIDACIONES_FORMULARIO_GUARDAR_PROYECTO)
  }

  limpiarCampos(): void {
    this.formularioProyectos.get('codigo').setValue('');
    this.formularioProyectos.get('nombreProyecto').setValue('');
    this.formularioProyectos.get('objetivoGeneral').setValue('');
    this.formularioProyectos.get('programa').setValue('');
    this.formularioProyectos.get('anio').setValue('');
    this.formularioProyectos.get('procedencia').setValue('');
    this.formularioProyectos.get('investigadorUno').setValue('');
    this.formularioProyectos.get('investigadorDos').setValue('');
    this.formularioProyectos.get('investigadorTres').setValue('');
    this.formularioProyectos.get('duracion').setValue('');
    this.formularioProyectos.get('valor').setValue('');  
  }

  generarAlertas(){
    for (const key of Object.keys(this.formularioProyectos.controls)) {
      if (this.formularioProyectos.controls[key].invalid) {
        const invalidControl = this.elementRef.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        break;
      }
    }
  }

  guardarProyecto(): void {
    this.generarAlertas();
    this.mensajeAlerta = '';
    if (this.formularioProyectos.valid) {
      const body: GuardarProyecto = {
        codigo: this.formularioProyectos.get('codigo').value,
        nombreProyecto: this.formularioProyectos.get('nombreProyecto').value,
        objetivoGeneral: this.formularioProyectos.get('objetivoGeneral').value,
        programa: this.formularioProyectos.get('programa').value,
        anio: this.formularioProyectos.get('anio').value,
        procedencia: this.formularioProyectos.get('procedencia').value,
        investigadorUno: this.formularioProyectos.get('investigadorUno').value,
        investigadorDos: this.formularioProyectos.get('investigadorDos').value,
        investigadorTres: this.formularioProyectos.get('investigadorTres').value,
        duracion: this.formularioProyectos.get('duracion').value,
        valorProyecto: this.formularioProyectos.get('valor').value,
        cantidadProyectos: this.maximo
      }
      this.proyectosService.guardarProyecto(body).subscribe((proyecto: GuardarProyecto) => {
        this.router.navigate([''])
      }, (_) => {
        this.mensajeAlerta = `Error al guardar el proyecto ${body.codigo}`;
        this.tipoAlerta = 'text-danger'
      })
    }
  }

  programaSeleccionado(evento: any){
    for(var i=0; i<this.listaProgramas.length; i++){
      if(evento.value == this.listaProgramas[i].carrera){
        this.pronombre = this.listaProgramas[i].pronombre;
        this.idPrograma = this.listaProgramas[i].id;
        this.nombrePrograma = this.listaProgramas[i].carrera
        break;
      }
    }
    this.generarCodigo();
  }

  generarCodigo(): void{
    this.proyectosService.obtenerGeneradorId(this.nombrePrograma).subscribe((valor: string) => {
      this.maximo = valor;
      const codigo = this.pronombre.concat('-').concat(this.idPrograma).concat('-').concat(this.formularioProyectos.get('anio').value).concat('-').concat(valor);
      this.formularioProyectos.get('codigo').setValue(codigo);
    });
  }
  
}
