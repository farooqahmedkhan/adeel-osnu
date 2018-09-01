import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  sendNotification(data: any): Observable<any>{
    return this.httpClient.post(environment.API.BASE_URL + '/send_notification', data);
  }
}
