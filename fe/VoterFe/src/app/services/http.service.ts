import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = 'http://localhost:51422';

  constructor(private http: HttpClient) { }
  
  get(endpoint:string): Observable<any>{
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  getById(endpoint:string, id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}/${id}`);
  }

  post(endpoint: string, body: any):Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, body);
  }

  put(endpoint: string, body:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/${endpoint}`, body);
  }
}
