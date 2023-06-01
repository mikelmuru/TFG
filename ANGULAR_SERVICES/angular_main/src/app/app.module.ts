import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainChatDemoComponent } from './componentes/main-chat-demo/main-chat-demo.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './componentes/home/home.component';
import { ExamenesComponent } from './componentes/examenes/examenes.component';
import { ApuntesComponent } from './componentes/apuntes/apuntes.component';
import { ServiciosIasComponent } from './componentes/servicios-ias/servicios-ias.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MainChatDemoComponent,
    MenuComponent,
    HomeComponent,
    ExamenesComponent,
    ApuntesComponent,
    ServiciosIasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
