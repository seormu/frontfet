import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './componentes/dashboard/index/index.component';
import { SidebarComponent } from './componentes/dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './componentes/dashboard/header/header.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClientModule } from  '@angular/common/http';
import { RegistroProyectosComponent } from './componentes/dashboard/registro-proyectos/registro-proyectos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DetalleProyectoComponent } from './componentes/dashboard/detalle-proyecto/detalle-proyecto.component';
import { NotfoundComponent } from './componentes/dashboard/notfound/notfound.component';
import { ActualizarProyectoComponent } from './componentes/dashboard/actualizar-proyecto/actualizar-proyecto.component'



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    RegistroProyectosComponent,
    DetalleProyectoComponent,
    NotfoundComponent,
    ActualizarProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
