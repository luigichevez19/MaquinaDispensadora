import { Injectable } from '@angular/core';
// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cliente } from '../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';
import { escapeRegExp } from '@angular/compiler/src/util';

//import { collection, addDoc } from "firebase/firestore"; 
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
// Traer los datos de firebase
clienteList: AngularFireList<any>;
clienteList2: Cliente[];
estado:Boolean;
// Una variable temporal, para guardar los datos seleccionados, del tipo cliente
selectedcliente: Cliente = new Cliente();

constructor(private firebase: AngularFireDatabase,public toastr: ToastrService) { }

// Traer todos los clienteos desde firebase 
getclientes() { // guarda los elementos en la varible 'clientes'
  return this.clienteList = this.firebase.list('clientes');
}
consulClie(clien:Cliente){
  this.getclientes()
    .snapshotChanges().subscribe(item => {
      this.clienteList2 = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clienteList2.push(x as Cliente);
      });

      this.clienteList2 = this.clienteList2.filter(data => {
         if(data.dui.toString().trim() === clien.dui)this.estado=false;
      })
      if(this.clienteList2.length === 0){
       
       this.estado=true;
      }
    });
    return this.estado;
}
// crear un nuevo clienteo  , recibiendo un parametro de tipo cliente
insertcliente(cliente: Cliente) {
  
  if(this.validation(cliente))
  {
    if(this.consulClie(cliente))
    {
      this.clienteList.push({
      name: cliente.name,
      lastName: cliente.lastName,
      bordDate: cliente.bordDate,
      dui: cliente.dui
      });
    }else{ this.toastr.warning('El dui ya esta registrado', 'Advertencia');}
  }     
}

// Actualiza un clienteo, recibiendo un parametro de tipo cliente
updatecliente(cliente: Cliente) {
  //Metodo validacion y metodo para firebase
  if(this.validation(cliente))
  { 
    this.clienteList.update(cliente.$key, {
      name: cliente.name,
      lastName: cliente.lastName,
      bordDate: cliente.bordDate,
     // dui: cliente.dui
    
    });
  }  
}

validation(cliente: Cliente)
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
}
// Elimina un cliente, recibiendo como parametro la clave , utilizando el metodo remove de firebase
deletecliente($key: string) {
  this.clienteList.remove($key);
}

}
