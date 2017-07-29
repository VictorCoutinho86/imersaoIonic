import { HomePage } from './../home/home';
import { Usuario } from '../../app/shared/usuario';
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Headers, Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/Rx';


@Component({
  selector: 'cadastro',
  templateUrl: 'cadastro.html'

})
export class Cadastro {
    usuarioForm: FormGroup
    submitAttempt: boolean = false;
    mensagem: string
    usuario:Usuario
    url:string = "http://localhost:8080/user";

    constructor(public navCtrl: NavController, 
      public formBuilder: FormBuilder, 
      public alertCtrl: AlertController,
      private http:Http) {

    this.usuarioForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.maxLength(60), Validators.minLength(5), 
        Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])]
    });
  }

  save(){

    this.submitAttempt = true;

    if(this.usuarioForm.valid) {
      console.log("success!");
      this.submit();
      this.submitAttempt = false;
      this.navCtrl.setRoot(HomePage);
    } else {

    }

  }

  submit() {
    let headers = new Headers({'content-type': 'application/json'});
    let body = JSON.stringify({nome: this.usuarioForm.value.nome, 
      email: this.usuarioForm.value.email});

    this.http
      .post(this.url, body, { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        console.log(this.usuarioForm.value);
        this.mensagem = data;
      });
      
}
  /*  showAlert(res:string):void {
    let alert = this.alertCtrl.create({
      title: 'Cadastro!',
      subTitle: this.mensagem,
      buttons: ['OK']
    });
    }*/

}