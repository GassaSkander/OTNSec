import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private baseUrl = 'http://localhost:3000';
  private scriptUrl = '/scripts/execute-script'
  constructor(private http: HttpClient) { }

  executeScript(): Observable<any> {
    return this.http.get<any>(this.baseUrl + this.scriptUrl)
  }
}
