import { AboutPage } from './../about/about';
import { Usuario } from '../../app/shared/usuario';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { Headers, Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/Rx';


@Component({
    selector: 'update',
    templateUrl: 'update.html'

})
export class Update implements OnInit {
    usuarioForm: FormGroup
    submitAttempt: boolean = false;
    mensagem: string
    usuario: Usuario

    url: string = "http://localhost:8080/user";

    ngOnInit() {
        this.usuario
    }

    constructor(public navCtrl: NavController,
        public formBuilder: FormBuilder,
        public navParams: NavParams,
        private http: Http,
        public events: Events) {

        this.usuario = this.navParams.get('usuario');


        this.usuarioForm = this.formBuilder.group({
            nome: ['', Validators.compose([Validators.maxLength(60), Validators.minLength(5),
            Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            email: ['', Validators.compose([Validators.email, Validators.required])]
        });
    }

    update() {

        this.submitAttempt = true;

        if (this.usuarioForm.valid) {
            console.log("success!");
            this.submit();
            this.submitAttempt = false;
            this.events.publish('reloadPage');
            this.navCtrl.popTo(AboutPage, { usuario: this.usuario });
        } else {

        }

    }

    submit() {
        let headers = new Headers({ 'content-type': 'application/json' });
        let body = JSON.stringify({
            nome: this.usuarioForm.value.nome,
            email: this.usuarioForm.value.email
        });

        this.http
            .put(this.url, body, { headers: headers })
            .map(res => res.json())
            .subscribe(data => {
                console.log(this.usuarioForm.value);
            });
    }
}