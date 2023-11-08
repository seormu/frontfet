import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Acceso, ResultadoAcceso } from 'src/app/interfaces/acceso';
import { AccesoService } from 'src/app/services/acceso/acceso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formulario: FormGroup;
  mensajeAlerta: string = '';

  constructor(
    private readonly acceso: AccesoService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  )
  {}

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      contrasenia: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }

  login(): void {
    if(this.formulario.valid){
      const datos: Acceso = {
        usuario: this.formulario.get('usuario').value,
        contrasenia: this.formulario.get('contrasenia').value
      }
      this.acceso.iniciarSesion(datos).subscribe((resultado: ResultadoAcceso) => {
        this.router.navigate([''])
      },(error => {
        this.mensajeAlerta = "Usuario o contraseña incorrectas";
      }))
    }else{
      this.mensajeAlerta = 'Ingrese usuario y contraseña';
    }
  }

}
