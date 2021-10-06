import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//  Service 
import { CuentaService } from '../../../services/cuenta.service';
import { ClienteService } from '../../../services/cliente.service';
// Class
import { Cuenta } from '../../../models/cuenta';
import { Cliente } from '../../../models//cliente';
// toastr
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})

export class CuentasComponent implements OnInit {
  clienteList: Cliente[];

  constructor(public cuentaService: CuentaService,
    public toastr: ToastrService,public clienteService: ClienteService) {
     }

 
  // Cuando se levanta la aplicacion, llama al metodo del servicio firebase para traer los productos
  ngOnInit() {
    this.cuentaService.getCuentas();
   this.combox();
    this.resetForm();
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
  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(cuentaForm: NgForm) {
   
    if (cuentaForm.value.$key == null)
      this.cuentaService.insertCuenta(cuentaForm.value);
    else
    {
      this.cuentaService.updateCuenta(cuentaForm.value);
    }     
      //if (this.cuentaService.validation(cuentaForm.value) )
      {
         this.resetForm(cuentaForm);
      }
    
  }

  // Para limpiar el formulario
  resetForm(cuentaForm?: NgForm) {
    if (cuentaForm != null)
      cuentaForm.reset();
    this.cuentaService.selectedcuenta = new Cuenta();
  }

}
