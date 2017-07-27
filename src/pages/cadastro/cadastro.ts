import { UsuarioService } from './../../app/services/usuario.service';
import { Usuario } from '../../app/shared/usuario';
import { Component, Input } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';



@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.html'

})
export class Cadastro {
    mensagem: string
    @Input() nome:string
    @Input() email:string
    usuario:Usuario
    constructor(private usuarioService: UsuarioService, 
        public navCtrl: NavController, 
        public alertCtrl: AlertController){}
    
    save(nome, email){
        this.usuario.nome = nome;
        this.usuario.email = email;
        this.usuarioService.create(this.usuario).then(Response=>this.mensagem = Response)
        this.showAlert();
    }
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cadastro!',
      subTitle: this.mensagem,
      buttons: ['OK']
    });
    alert.present(this.navCtrl.pop);
  }

}