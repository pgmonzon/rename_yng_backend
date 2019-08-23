import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: LoginService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${currentUser.token}`
                Authorization: `${currentUser.token}`
              })
            });
        } else {
            request = request.clone({
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              })
            });
      }

        return next.handle(request);
    }
}
