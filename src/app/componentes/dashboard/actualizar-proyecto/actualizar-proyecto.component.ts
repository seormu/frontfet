import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FORMATO_FECHA, SOLO_NUMEROS } from 'src/app/constantes/CaracteresEspeciales';
import { VALIDACIONES_FORMULARIO_GUARDAR_PROYECTO } from 'src/app/constantes/validacionesFormulario';
import { EstadoProyecto } from 'src/app/interfaces/estados';
import { Programas } from 'src/app/interfaces/programas';
import { GuardarProyecto, Proyecto } from 'src/app/interfaces/proyectos';
import { estadoProyectoMock } from 'src/app/mocks/estadoProyecto.mock';
import { ProgramasService } from 'src/app/services/programas/programas.service';
import { ProyectosService } from 'src/app/services/proyectos/proyectos.service';
import { ValidacionesService } from 'src/app/services/validaciones/validaciones-service.service';

@Component({
  selector: 'app-actualizar-proyecto',
  templateUrl: './actualizar-proyecto.component.html',
  styleUrls: ['./actualizar-proyecto.component.css']
})
export class ActualizarProyectoComponent implements OnInit{


  formularioProyectos: FormGroup;
  pronombre: string = '';
  idPrograma: string = '';
  anioProyecto: string = '';
  listaProgramas: Programas[];
  proyecto: Proyecto;
  mensajeAlerta: string;
  tipoAlerta: string;
  programa: string;
  maximo: string;
  estadosProyectos: EstadoProyecto[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validacionesService: ValidacionesService,
    private readonly programasService: ProgramasService,
    private readonly proyectosServices: ProyectosService,
    private readonly elementRef: ElementRef,
    private readonly router: Router,
  ){}

  ngOnInit(){
    this.crearFormulario();
    this.consultarProgramas();
    this.proyectosServices.detalleProyecto$.subscribe((proyecto: Proyecto) => {
      this.proyecto = proyecto;
      this.programa = proyecto.programa;
    })
    this.consultarEstadosProyectos()
  }

  consultarEstadosProyectos(): void {
    this.estadosProyectos = estadoProyectoMock;
  }

  consultarProgramas(): void {
    this.programasService.consultarProgramas().subscribe((programas: Programas[])=> {
      this.listaProgramas = programas;
      this.asignarCampos();
    })
  }

  asignarCampos(): void {
    this.formularioProyectos.get('codigo').setValue(this.proyecto.codigo);
    this.formularioProyectos.get('programa').setValue(this.proyecto.programa);
    this.formularioProyectos.get('nombreProyecto').setValue(this.proyecto.nombreProyecto);
    this.formularioProyectos.get('objetivoGeneral').setValue(this.proyecto.objetivoGeneral);
    this.formularioProyectos.get('anio').setValue(this.proyecto.anio);
    this.formularioProyectos.get('procedencia').setValue(this.proyecto.procedencia);
    this.formularioProyectos.get('investigadorUno').setValue(this.proyecto.investigadorUno);
    this.formularioProyectos.get('investigadorDos').setValue(this.proyecto.investigadorDos);
    this.formularioProyectos.get('investigadorUno').setValue(this.proyecto.investigadorUno);
    this.formularioProyectos.get('investigadorTres').setValue(this.proyecto.investigadorTres);
    this.formularioProyectos.get('fechaInicio').setValue(this.proyecto.fechaInicio);
    this.formularioProyectos.get('fechaFin').setValue(this.proyecto.fechaFin);
    this.formularioProyectos.get('estado').setValue(this.proyecto.estado);
    this.formularioProyectos.get('valor').setValue(this.proyecto.valorProyecto);
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
      fechaInicio: ['', [Validators.pattern(FORMATO_FECHA), Validators.maxLength(10), Validators.required]],
      fechaFin: ['', [Validators.pattern(FORMATO_FECHA), Validators.maxLength(10),Validators.required]],
      valor: ['', [Validators.pattern(SOLO_NUMEROS), Validators.maxLength(10)]],
      estado: ['', [Validators.required]]
    });
    this.formularioProyectos.get('codigo').disable()
  }

  campoEsInvalido(nombreCampo: string): boolean {
    return this.validacionesService.campoEsInvalido(this.formularioProyectos, nombreCampo);
  }

  obtenerMensajeErrorCampo(nombreCampo: string): string {
    return this.validacionesService.obtenerMensajeErrorCampo(this.formularioProyectos, nombreCampo, VALIDACIONES_FORMULARIO_GUARDAR_PROYECTO)
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
        fechaInicio: this.formularioProyectos.get('fechaInicio').value,
        fechaFin: this.formularioProyectos.get('fechaFin').value,
        estado: this.formularioProyectos.get('estado').value,
        valorProyecto: this.formularioProyectos.get('valor').value,
      }
      this.validarFechas(body);
    }
  }

  validarFechas(proyecto: GuardarProyecto): void {
    console.log("fin", this.formularioProyectos.get('fechaFin').value)
    console.log("fechaInicio", this.formularioProyectos.get('fechaInicio').value)
    if(proyecto.fechaInicio > proyecto.fechaFin || proyecto.fechaInicio == proyecto.fechaFin){
      this.formularioProyectos.controls['fechaFin'].setErrors({'menos': true})
    }else{
      this.proyectosServices.actualizarProyecto(proyecto, this.proyecto.id).subscribe((proyecto: GuardarProyecto) => {
        this.router.navigate([`detalle-proyecto`, this.proyecto.id])
      }, (_) => {
        this.mensajeAlerta = `Error al guardar el proyecto ${proyecto.codigo}`;
        this.tipoAlerta = 'text-danger'
      })
    }
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

  generarCodigo(): void{
    this.proyectosServices.obtenerGeneradorId(this.programa).subscribe((valor: string) => {
      this.maximo = valor;
      const codigo = this.pronombre.concat('-').concat(this.idPrograma).concat('-').concat(this.formularioProyectos.get('anio').value).concat('-').concat(valor);
      this.formularioProyectos.get('codigo').setValue(codigo);
    });
  }

  programaSeleccionado(evento: any){
    let res;
    if(evento.value == undefined){
      res=this.programa;
    }else{
      res = evento.value
    }
    for(var i=0; i<this.listaProgramas.length; i++){
      if(res == this.listaProgramas[i].carrera){
        this.pronombre = this.listaProgramas[i].pronombre;
        this.idPrograma = this.listaProgramas[i].id;
        this.programa = this.listaProgramas[i].carrera;
        break;
      }
    }
    this.generarCodigo();
  }



}
