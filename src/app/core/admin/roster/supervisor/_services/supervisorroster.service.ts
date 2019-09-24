import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getsupervisorresponse } from '../_models/getsupervisorresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisorrosterService {

  constructor(private http: HttpClient) { }

  callGetSupervisorRoster(): Observable<HttpResponse<Getsupervisorresponse>> {
    console.log('In callGetSupervisorRoster of service');
    return this.http.get<Getsupervisorresponse>(environment.appUrl + '/supervisorroster', {observe: 'response'});
  }
}
