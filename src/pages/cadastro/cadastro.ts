import { Location } from '@angular/common';
import { UsuarioService } from './../../app/services/usuario.service';
import { Usuario } from './../../app/shared/usuario';
import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.html'

})
export class Cadastro {
    mensagem: string
    
    constructor(private usuarioService: UsuarioService, 
        private location:Location, 
        public alertCtrl: AlertController){}
    
    save(usuario:Usuario){
      
        this.usuarioService.create(usuario);
        this.showAlert();
    }
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cadastro!',
      subTitle: this.mensagem,
      buttons: ['OK']
    });
    alert.present(this.location.back);
  }

}