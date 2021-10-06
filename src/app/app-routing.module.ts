import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { ProductosComponent } from './components/productos/productos.component';


const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: 'productos', component: ProductosComponent },
 ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],exports:[RouterModule]
})
export class AppRoutingModule { }
