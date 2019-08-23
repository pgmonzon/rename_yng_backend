import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Login} from '../app/_models';
import { LoginService } from '../app/_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Yangee Reloaded';
  ahora = new Date();
  currentUser: Login;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
}
