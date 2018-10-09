import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: any = { email: '', password: ''};

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit() {
    if(this.loginService.IsLoggedIn){ this.route.navigate([environment.AFTER_LOGIN_ROUTE]);}
  }

  doLogin(e: any){    
    if(this.loginService.login(this.user.email, this.user.password)){
      this.route.navigate([environment.AFTER_LOGIN_ROUTE]);
    }else{
      alert('Invalid credentials');
    }
  }
}
