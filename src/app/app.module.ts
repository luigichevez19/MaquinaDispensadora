import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
//import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteComponent } from './components/clientes/cliente/cliente.component';

// service
import { ClienteService } from './services/cliente.service';

// Toastr, para notificaciones en angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { CuentasListComponent } from './components/cuenta/cuentas-list/cuentas-list.component';
import { CuentasComponent } from './components/cuenta/cuentas/cuentas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoListComponent } from './components/productos/producto-list/producto-list.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    ClienteListComponent,
    ClienteComponent,
    CuentaComponent,
    CuentasListComponent,
    CuentasComponent,
    ProductosComponent,
    ProductoListComponent,
    ProductoComponent,
  
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
