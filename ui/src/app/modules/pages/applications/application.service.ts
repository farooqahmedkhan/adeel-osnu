import { Injectable } from '@angular/core';
import { Application } from '../../core/models/application.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClient: HttpClient) { }

  getApplications(params: string[] = []): Observable<Application[]> {
    return this.httpClient.get<Application[]>(environment.API.BASE_URL + environment.API.ROUTES.APPS + (params.length > 0 ? ('?' + params.join("&")) : ""));
  }

  saveApplication(application: Application): Observable<Application> {
    return this.httpClient.post<Application>(environment.API.BASE_URL + environment.API.ROUTES.APPS, application);
  }

  updateApplication(identifier: Number, application: Application): Observable<Application> {
    console.log('App =>', application);
    return this.httpClient.put<Application>(environment.API.BASE_URL + environment.API.ROUTES.APPS + identifier, application);
  }

  getApplication(identifier: Number): Observable<Application>{
    return this.httpClient.get<Application>(environment.API.BASE_URL + environment.API.ROUTES.APPS + identifier);
  }

  updateState(identifier: Number, state: boolean): Observable<Application>{
    return this.httpClient.put<Application>(environment.API.BASE_URL + environment.API.ROUTES.APPS + identifier + '/state/' + state, []);
  }
}
