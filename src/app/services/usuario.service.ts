import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

import { Usuario } from '../shared/usuario';

@Injectable()
export class UsuarioService {
  private urlBase:string = "http://localhost:8080/user";
  //private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  getUsuarios():Promise<Usuario[]>{
    return this.http.get(this.urlBase)
      .toPromise()
      .then(Response=>Response.json() as Usuario[])
      .catch(this.handleError);

  }
  
  getUsuario(id:number):Promise<Usuario>{
    return this.http.get(this.urlBase+"/"+id)
      .toPromise()
      .then(Response=>Response.json() as Usuario)
      .catch(this.handleError);

  }
  
  update(usuario:Usuario):Promise<Usuario>{
    return this.http.put(this.urlBase+"/"+usuario.id, usuario)
    .toPromise()
    .then(()=>usuario)
    .catch(this.handleError);
  }

  create(usuario:Usuario):Promise<string>{
    return this.http.post(this.urlBase, JSON.stringify(usuario))
    .toPromise()
    .then(Response=>Response.json)
    .catch(this.handleError);
  }

  delete(id:number):Promise<string>{
    return this.http.delete(this.urlBase+"/"+id)
    .toPromise()
    .then(Response=>Response.json)
    .catch(this.handleError);
  }


private handleError(error: any): Promise<any> {
  console.error('Ocorreu o seguinte erro', error); // Para Aparecer no console
  return Promise.reject(error.message || error);
}
}