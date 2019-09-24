import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getworkcenterresponse } from '../_models/getworkcenterresponse';
import { environment } from 'src/environments/environment';
import { Addworkcenterresponse } from '../_models/addworkcenterresponse';
import { Addworkcenter } from '../_models/addworkcenter';
import { retry, catchError } from 'rxjs/operators';
import { Deleteresponse } from '../../deleteresponse';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WorkcenterService {

  constructor(private http: HttpClient) { }

  callGetWorkcenterConfig(): Observable<HttpResponse<Getworkcenterresponse>> {
    console.log('In callGetWorkcenterConfig method in service');
    return this.http.get<Getworkcenterresponse>(environment.appUrl + '/workcenterconfig', { observe: 'response'});
  }

  callPostWorkcenterConfig(addWorkcenterArray: Addworkcenter[]): Observable<Addworkcenterresponse> {
    console.log('In callPostWorkcenterConfig method in service');
    return this.http.post<Addworkcenterresponse>(environment.appUrl + '/workcenterconfig', addWorkcenterArray, httpOptions).pipe(
      retry(3)
    );
  }

  callDeleteWorkcenterConfig(ids: number): Observable<Deleteresponse> {
    const error: any = 'something wrong happened';
    const url = environment.appUrl + '/workcenterconfig?workcenterid=' + ids;
    console.log('In callDeleteAgentRoleConfig method in service and url is ' + url);
    return this.http.delete<Deleteresponse>(url , httpOptions).pipe(
      catchError(error)
    );
  }
}
