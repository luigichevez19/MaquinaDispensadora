import { Component, OnInit } from '@angular/core';
// model
import { Cliente } from '../../../models//cliente';
// service
import { ClienteService } from '../../../services/cliente.service';

// toastr
import { ToastrService } from 'ngx-toastr';
import { Cuenta } from 'src/app/models/cuenta';
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clienteList: Cliente[];
  buscar:string;
  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) { }


  /* 
    Cuando cargue la aplicación, que reciba toda la información con el método 'getclientes' del servicio de firebase
     pero ademas que utilice el metodo 'snapshotChanges' para estar atento a los cambios que tengas los datos en la
     base de datos de firebase, para recorrerlo con forEach. 
  
     Cada dato lo obtengo 'payload' y lo convierto en formato JSON y lo asigno a la variable 'x'
     let x = element.payload.toJSON();
  
     Se le asigna por cada elemento la llave de cada registro, en una propiedad llamada '$key'
     por que se necesita para luego eliminar el registro
     x["$key"] = element.key;
  
     Cuando ya se tiene el elemento se asigna a mi arreglo 'clienteList' para ser mostrado en mi pantalla list
     this.clienteList.push(x as cliente);
  */
  ngOnInit() {
   this.mostrarRegistros();
  }
  mostrarRegistros()
  { 
    return this.clienteService.getclientes()
    .snapshotChanges().subscribe(item => {
      this.clienteList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clienteList.push(x as Cliente);
      });
    });

  }
  consulClie(){
    

    this.clienteService.getclientes()
      .snapshotChanges().subscribe(item => {
        this.clienteList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.clienteList.push(x as Cliente);
        });

        this.clienteList = this.clienteList.filter(data => {
          return data.dui.toString().trim() === this.buscar;
        })
  
        if(this.clienteList.length === 0){
          this.toastr.warning('Registro no encontrado', 'Advertencia');
          this.mostrarRegistros();
        }
      });
  }
  /* 
   Recibe una varible de tipo 'cliente' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, cliente)'  
  */
  onEdit(cliente: Cliente) {
    this.clienteService.selectedcliente = Object.assign({}, cliente);
  }

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deletecliente' del servicio de firebase
   ademas muestra un 'warning' con toastr
*/
  onDelete($key: string) {
    if (confirm('¿Estas seguro de elimnar?')) {
      this.clienteService.deletecliente($key);
      this.toastr.warning('Eliminado', 'cliente Removido');
    }
  }

}
