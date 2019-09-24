import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Gettaresponse } from '../_models/gettaresponse';
import { environment } from 'src/environments/environment';
import { Addtaresponse } from '../_models/addtaresponse';
import { Addta } from '../_models/addta';
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
export class TaService {

  constructor(private http: HttpClient) { }

  callGetTaConfig(): Observable<HttpResponse<Gettaresponse>> {
    console.log(' In callTaConfig method in service');
    return this.http.get<Gettaresponse>(environment.appUrl + '/taconfig', {observe: 'response'});
  }

  callPostTaConfig(addTa: Addta[]): Observable<Addtaresponse> {
    console.log('In callPostTaConfig method in service');
    return this.http.post<Addtaresponse>(environment.appUrl + '/taconfig' , addTa, httpOptions).pipe(
      retry(3)
    );
  }

  callDeleteAssignmentsConfig(ids: number): Observable<Deleteresponse> {
    const error: any = 'something wrong happened';
    const url = environment.appUrl + '/taconfig?ta_id=' + ids;
    console.log('In callDeleteAgentRoleConfig method in service and url is ' + url);
    return this.http.delete<Deleteresponse>(url , httpOptions).pipe(
      catchError(error)
    );
  }
}
