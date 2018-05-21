
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<Pizza[]> {
    return this.httpClient.get<Pizza[]>('./assets/pizzas.json');
  }
}
