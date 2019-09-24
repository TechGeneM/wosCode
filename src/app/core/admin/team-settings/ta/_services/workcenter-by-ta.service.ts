import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkcenterByTaresponse } from '../_models/workcenter-by-taresponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkcenterByTaService {

  constructor(private http: HttpClient) { }

  callGetTaWorkcenterCount(): Observable<HttpResponse<WorkcenterByTaresponse>> {
    console.log('In callGetTaWorkcenterCount method in service');
    return this.http.get<WorkcenterByTaresponse>(environment.appUrl + '/taworkcentercount', {observe: 'response'});
  }
}
