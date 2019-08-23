import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Login } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  login(usuario: string, clave: string ) {
    return this.http.post<any>(`${environment.apiUrl}/autorizar`, { usuario, clave })
    .pipe(map(respuesta => {
      // login successful if there's a jwt token in the response
      if (respuesta && respuesta.data.login.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(respuesta.data.login));
        this.currentUserSubject.next(respuesta.data.login);
      }
      return respuesta;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
