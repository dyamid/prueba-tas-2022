import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListCategoriesService {
  _url = "https://my-json-server.typicode.com/TASNETWORK/Prueba-DJunior/categories"

  constructor(private http: HttpClient) { }
  getProductos() {
    let header = new HttpHeaders()
      .set('Type-content', 'aplication/json')

    return this.http.get(this._url, {
      headers: header
    });
  }
}
