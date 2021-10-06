import { Component, OnInit } from '@angular/core';
// model
import { Cuenta } from '../../../models//cuenta';
import { Cliente } from '../../../models//cliente';

// service
import { CuentaService } from '../../../services/cuenta.service';
import { ClienteService } from '../../../services/cliente.service';

// toastr
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {
  cuentaList: Cuenta[];
  clienteList: Cliente[];


  constructor(
    private cuentaService: CuentaService,private clienteService: ClienteService,
    private toastr: ToastrService
  ) { 
  }


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
this.mostrarcuenta();  
  }
  mostrarcuenta(){
    return this.cuentaService.getCuentas()
      .snapshotChanges().subscribe(item => {
        this.cuentaList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.cuentaList.push(x as Cuenta);
        });
      });

  }

  combox(){

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
  /* 
   Recibe una varible de tipo 'cliente' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, cliente)'  
  */
  onEdit(cuenta: Cuenta) {
    this.cuentaService.selectedcuenta = Object.assign({}, cuenta);
    //this.cuentaService.selectedcliente = Object.assign({},cliente);
  }

  /* 
   Recibe la llave '$key' para eliminar el registro, invocando el metodo 'deletecuenta' del servicio de firebase
   ademas muestra un 'warning' con toastr
*/
  onDelete($key: string) {
    if (confirm('¿Estas seguro de elimnar?')) {
      this.cuentaService.deletecuenta($key);
      this.toastr.warning('Eliminado', 'cuenta Removido');
    }
  }

}
