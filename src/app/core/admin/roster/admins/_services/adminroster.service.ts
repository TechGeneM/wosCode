import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getadminresponse } from '../_models/getadminresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminrosterService {

  constructor(private http: HttpClient) { }

  callGetAdminRoster(): Observable<HttpResponse<Getadminresponse>> {
    console.log('In callGetAdminRoster method in service');
    return this.http.get<Getadminresponse>(environment.appUrl + '/admin', {observe: 'response'});
  }
}
