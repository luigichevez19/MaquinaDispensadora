import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//  Service 
import { ClienteService } from '../../../services/cliente.service';
// Class
import { Cliente } from '../../../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public clienteService: ClienteService,
    public toastr: ToastrService) {
     }

 
  // Cuando se levanta la aplicacion, llama al metodo del servicio firebase para traer los productos
  ngOnInit() {
    this.clienteService.getclientes();
    this.resetForm();
  }

  // Recibe un formulario del tipo NgForm, lo envia a guardar o actualizar , invocando el servicio Firebase
  // lo termina limpiando resetForm
  onSubmit(clienteForm: NgForm) {
   
    if (clienteForm.value.$key == null)
      this.clienteService.insertcliente(clienteForm.value);
    else
    {
      this.clienteService.updatecliente(clienteForm.value);
    }     
      if (clienteForm.value.dui.match("^\\d{8}-\\d$")  )
      {
         this.resetForm(clienteForm);
      }
    
  }

  // Para limpiar el formulario
  resetForm(clienteForm?: NgForm) {
    if (clienteForm != null)
      clienteForm.reset();
    this.clienteService.selectedcliente = new Cliente();
  }

}
