import { Usuario } from './../../app/shared/usuario';
import { UsuarioService } from './../../app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Location } from "@angular/common";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'

})
export class AboutPage implements OnInit {

  usuario:Usuario
  
  constructor(
    public navCtrl: NavController, 
    private usuarioService:UsuarioService, 
    private location:Location) {

  }

  ngOnInit(){
    this.getUsuario();
  }
  getUsuario(){
    this.usuarioService.getUsuario(1).then(usuario => this.usuario = usuario);
  }
   swipeEvent(e) {
    this.location.back();
}
}
