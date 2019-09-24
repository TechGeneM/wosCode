import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getagenttyperesponse } from '../_models/getagenttyperesponse';
import { environment } from 'src/environments/environment';
import { Addagenttyperesponse } from '../_models/addagenttyperesponse';
import { Deleteresponse } from '../../deleteresponse';
import { catchError } from 'rxjs/operators';
import { Addagenttype } from '../_models/addagenttype';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AgenttypeService {

  constructor(private http: HttpClient) { }

  callGetAgentTypeConfig(): Observable<HttpResponse<Getagenttyperesponse>> {
    console.log('In callGetAgentTypeConfig method in service');
    return this.http.get<Getagenttyperesponse>(environment.appUrl + '/agenttypeconfig', {observe: 'response'});
  }

  callPostAgentTypeConfig(addAgentTypeArray: Addagenttype[]): Observable<Addagenttyperesponse> {
    console.log('In callPostAgentTypeConfig method in service');
    return this.http.post<Addagenttyperesponse>(environment.appUrl + '/agenttypeconfig', addAgentTypeArray, httpOptions);
  }

  callDeleteAgentTypeConfig(ids: number): Observable<Deleteresponse> {
    const error: any = 'something wrong happened';
    const url = environment.appUrl + '/agenttypeconfig?agentTypeId=' + ids;
    console.log('In callDeleteAgentRoleConfig method in service and url is ' + url);
    return this.http.delete<Deleteresponse>(url , httpOptions).pipe(
      catchError(error)
    );
  }
}
