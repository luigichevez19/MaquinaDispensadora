import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cliente } from '../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
// Traer los datos de firebase
clienteList: AngularFireList<any>;

// Una variable temporal, para guardar los datos seleccionados, del tipo cliente
selectedcliente: Cliente = new Cliente();

constructor(private firebase: AngularFireDatabase,public toastr: ToastrService) { }

// Traer todos los clienteos desde firebase 
getclientes() { // guarda los elementos en la varible 'clientes'
  return this.clienteList = this.firebase.list('clientes');
}

// crear un nuevo clienteo  , recibiendo un parametro de tipo cliente
insertcliente(cliente: Cliente) {
  // agregar un dato al final de la lista, como recibe un objeto del tipo cliente , puede acceder a sus propiedades
  this.clienteList.push({
    name: cliente.name,
    lastName: cliente.lastName,
    bordDate: cliente.bordDate,
    dui: cliente.dui
  });
}

// Actualiza un clienteo, recibiendo un parametro de tipo cliente
updatecliente(cliente: Cliente) {
  // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
  this.clienteList.update(cliente.$key, {
    name: cliente.name,
    lastName: cliente.lastName,
    bordDate: cliente.bordDate,
    dui: cliente.dui
  
  });
}

// Elimina un clienteo, recibiendo como parametro la clave , utilizando el metodo remove de firebase
deletecliente($key: string) {
  this.clienteList.remove($key);
}

}
