import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cuenta } from '../models/cuenta';
import { Cliente } from '../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  cuentaList: AngularFireList<any>;

  // Una variable temporal, para guardar los datos seleccionados, del tipo cliente
  selectedcuenta : Cuenta = new Cuenta();
  
  constructor(private firebase: AngularFireDatabase,public toastr: ToastrService) { }
  
  // Traer todos los clienteos desde firebase 
  getCuentas() { // guarda los elementos en la varible 'Cuentas'
    return this.cuentaList = this.firebase.list('cuentas');
  }
  clienteList: AngularFireList<any>;

// Una variable temporal, para guardar los datos seleccionados, del tipo cliente
selectedcliente: Cliente = new Cliente();

// Traer todos los clienteos desde firebase 
getclientes() { // guarda los elementos en la varible 'clientes'
  return this.clienteList = this.firebase.list('clientes');
}
 
  // crear un nuevo Cuentao  , recibiendo un parametro de tipo Cuenta
  insertCuenta(cuenta: Cuenta) {
  //  if(this.validation(Cuenta))
    {
      this.cuentaList.push({
      idcliente: cuenta.idClie,
      saldo: cuenta.saldo,
      });
    }
    this.toastr.success('Info', 'Save');     
    this.cuentaList
  }
  
  // Actualiza un Cuentao, recibiendo un parametro de tipo Cuenta
  updateCuenta(cuenta: Cuenta) {
    //Metodo validacion y metodo para firebase
    //if(this.validation(cuenta))
    { 
      this.cuentaList.update(cuenta.$key, {
        idCliente: cuenta.idClie,
        saldo: cuenta.saldo     
      });
    }  
  }
  
  /*validation(cliente: Cliente)
  {
    var hoy = new Date();
    var cumpleanos = new Date(cliente.bordDate);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    var esta= null;
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    if(edad >=18)
    {
        if(cliente.dui.match("^\\d{8}-\\d$")){
            esta = true; }
            else
            {
              this.toastr.warning('Info', 'El dui no esta escrito correctamente ');
            }
    }
    else
    {
      this.toastr.warning('Info', 'Tiene que ser mayor de edad');
    }
      return esta;
  }*/
  // Elimina un cliente, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deletecuenta($key: string) {
    this.cuentaList.remove($key);
  }
}
