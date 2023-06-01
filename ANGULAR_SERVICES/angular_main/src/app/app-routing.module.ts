import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MainChatDemoComponent } from './componentes/main-chat-demo/main-chat-demo.component';
import { ExamenesComponent } from './componentes/examenes/examenes.component';
import { ApuntesComponent } from './componentes/apuntes/apuntes.component';
import { ServiciosIasComponent } from './componentes/servicios-ias/servicios-ias.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "examenes", component: ExamenesComponent
  },
  {
    path: "apuntes", component: ApuntesComponent
  },
  {
    path: "foro", component: MainChatDemoComponent
  },
  {
    path: "servicios-ias", component: ServiciosIasComponent
  }
];
