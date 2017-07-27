import { Usuario } from './../../app/shared/usuario';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UsuarioService } from "../../app/services/usuario.service";
import { Cadastro } from "../cadastro/cadastro";
import { AboutPage } from "../about/about";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  usuarios: Usuario[];

  constructor(public navCtrl: NavController, 
    private usuarioService:UsuarioService  ) {

  }

   ngOnInit() {
   this.getUsuarios();
}
getUsuarios(): void {
      this.usuarioService.getUsuarios()
      .then(usuarios => this.usuarios = usuarios);
}
goToCadastro():void {
  this.navCtrl.push(Cadastro);
}
goToAbout(id:number):void{
  this.navCtrl.push(AboutPage, id);
}
}
