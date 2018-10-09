import { Injectable } from '@angular/core';
import { USERS } from './auth.mockup';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { DateJS } from '../core/lib/DateJS';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private cookieService: CookieService) { }

  login(username: string, password: string){
    let user = USERS.find((i) => i.email == username);

    if(!user) { return false;}

    if(user.password == password){      
      this.cookieService.set(
        environment.LOGIN_COOKIE, 
        btoa(JSON.stringify(user))        
      ); // save information in cookie | browser storage
      return true;
    }else
      return false;
  }

  public get IsLoggedIn(){
    if(this.cookieService.check(environment.LOGIN_COOKIE)){
      let loggedUser = JSON.parse(atob(this.cookieService.get(environment.LOGIN_COOKIE)));    
      return ((USERS.find((i) => i.email == loggedUser.email)) != null);
    }else{
      return false;
    }    
  }
}
