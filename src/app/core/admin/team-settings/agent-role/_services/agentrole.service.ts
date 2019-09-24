import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getagentroleresponse } from '../_models/getagentroleresponse';
import { environment } from 'src/environments/environment';
import { Addagentroleresponse } from '../_models/addagentroleresponse';
import { Deleteresponse } from '../../deleteresponse';
import { catchError } from 'rxjs/operators';
import { Addagentrole } from '../_models/addagentrole';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AgentroleService {

  constructor(private http: HttpClient) { }

  callGetAgentRoleConfig(): Observable<HttpResponse<Getagentroleresponse>> {
    console.log('In callGetAgentRoleConfig method in service');
    return this.http.get<Getagentroleresponse>(environment.appUrl + '/agentroleconfig', {observe: 'response'});
  }

  callPostAgentRoleConfig(addAgentRoleArray: Addagentrole[]): Observable<Addagentroleresponse> {
    console.log('In callPostAgentRoleConfig method in service');
    return this.http.post<Addagentroleresponse>(environment.appUrl + '/agentroleconfig', addAgentRoleArray, httpOptions);
  }

  callDeleteAgentRoleConfig(ids: number): Observable<Deleteresponse> {
    const error: any = 'something wrong happened';
    const url = environment.appUrl + '/agentroleconfig?agentroleId=' + ids;
    console.log('In callDeleteAgentRoleConfig method in service and url is ' + url);
    return this.http.delete<Deleteresponse>(url , httpOptions).pipe(
      catchError(error)
    );
  }
}
