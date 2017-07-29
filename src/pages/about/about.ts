import { HomePage } from './../home/home';
import { Update } from './../update/update';
import { Usuario } from './../../app/shared/usuario';
import { UsuarioService } from './../../app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'

})
export class AboutPage implements OnInit {

  usuario:Usuario
  
  constructor(
    public navCtrl: NavController, 
    private usuarioService:UsuarioService, 
    public navParams:NavParams) {

      this.usuario = this.navParams.get('usuario');
  }

  ngOnInit(){
    this.getUsuario();
  }
  getUsuario(){
    this.usuarioService.getUsuario(this.usuario.id).then(usuario => this.usuario = usuario);
  }
  delete(usuario:any){
    this.usuarioService.delete(this.usuario.id);
    this.navCtrl.setRoot(HomePage);
  }
  update(usuario:any):void{
    this.navCtrl.push(Update, {usuario: usuario})
  }

}
