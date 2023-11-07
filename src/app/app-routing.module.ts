import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { IndexComponent } from './componentes/dashboard/index/index.component';
import { RegistroProyectosComponent } from './componentes/dashboard/registro-proyectos/registro-proyectos.component';
import { DetalleProyectoComponent } from './componentes/dashboard/detalle-proyecto/detalle-proyecto.component';
import { ProyectosResolverService } from './resolvers/proyectos.resolver.service';
import { NotfoundComponent } from './componentes/dashboard/notfound/notfound.component';
import { ActualizarProyectoComponent } from './componentes/dashboard/actualizar-proyecto/actualizar-proyecto.component';

const routes: Routes = [
  //{ path: 'inicio', component: IndexComponent},
  { path: '', component: IndexComponent},
  { 
    path: 'detalle-proyecto/:id-proyecto', 
    component: DetalleProyectoComponent,
    resolve: {
      detalle: ProyectosResolverService
    }  
  },
  { 
    path: 'actualizar-proyecto/:id-proyecto',
    component: ActualizarProyectoComponent,
    resolve: {
      detalle: ProyectosResolverService
    } 
  },
  { path: 'login', component: LoginComponent},
  { path: 'registrar-proyectos', component: RegistroProyectosComponent},
  { path: '404', component: NotfoundComponent},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
