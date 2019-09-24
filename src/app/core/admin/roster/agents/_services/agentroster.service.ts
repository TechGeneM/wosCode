import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getagentsresponse } from '../_models/getagentsresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentrosterService {

  constructor(private http: HttpClient) { }

  callGetAgentsRoster(): Observable<HttpResponse<Getagentsresponse>> {
    console.log('In callGetAgentsRoster method in service');
    return this.http.get<Getagentsresponse>(environment.appUrl + '/agentroster', {observe: 'response'});
  }
}
