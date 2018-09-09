import { Injectable } from '@angular/core';
import { Template } from '../../core/models/template.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private httpClient: HttpClient) { }

  getTemplates(params: string[] = []): Observable<Template[]> {
    return this.httpClient.get<Template[]>(environment.API.BASE_URL + environment.API.ROUTES.TEMPLATES + (params.length > 0 ? ('?' + params.join("&")) : ""));
  }

  saveTemplate(template: Template): Observable<Template> {
    return this.httpClient.post<Template>(environment.API.BASE_URL + environment.API.ROUTES.TEMPLATES, template);
  }

  updateTemplate(identifier: Number, template: Template): Observable<Template> {
    return this.httpClient.put<Template>(environment.API.BASE_URL + environment.API.ROUTES.TEMPLATES + identifier, template);
  }

  getTemplate(identifier: Number): Observable<Template>{
    return this.httpClient.get<Template>(environment.API.BASE_URL + environment.API.ROUTES.TEMPLATES + identifier);
  }
}
