import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

import { Tarefa } from '../shared/tarefa';

@Injectable()
export class TarefaService {
  private urlBase:string = "http://localhost:8080/todo";

  
  constructor(private http:Http) { }

  getTarefas():Promise<Tarefa[]>{
    return this.http.get(this.urlBase)
      .toPromise()
      .then(Response=>Response.json() as Tarefa[])
      .catch(this.handleError);

  }

  getTarefasCriador(id:number):Promise<Tarefa[]>{
    return this.http.get(this.urlBase+"/criador/"+id)
      .toPromise()
      .then(Response=>Response.json() as Tarefa[])
      .catch(this.handleError);

  }
  
  getTarefa(id:number):Promise<Tarefa>{
    return this.http.get(this.urlBase+"/"+id)
      .toPromise()
      .then(Response=>Response.json() as Tarefa)
      .catch(this.handleError);

  }
  
  update(tarefa:Tarefa):Promise<Tarefa>{
    return this.http.put(this.urlBase+"/"+tarefa.id, tarefa)
    .toPromise()
    .then(()=>tarefa)
    .catch(this.handleError);
  }

  create(tarefa:Tarefa):Promise<string>{
    return this.http.post(this.urlBase, tarefa)
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
