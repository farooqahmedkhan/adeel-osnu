import { Component } from '@angular/core';
import { LoginService } from './modules/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'osnu';

  constructor(private loginService: LoginService) { }

  public get IsLoggedIn(){ return this.loginService.IsLoggedIn;}
}
