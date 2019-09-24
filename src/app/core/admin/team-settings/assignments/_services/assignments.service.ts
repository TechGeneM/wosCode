import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Getassignmentsresponse } from '../_models/getassignmentsresponse';
import { environment } from 'src/environments/environment';
import { Deleteresponse } from '../../deleteresponse';
import { catchError, retry } from 'rxjs/operators';
import { Addassignmentsresponse } from '../_models/addassignmentsresponse';
import { AddAssignment } from 'src/app/views/admin/admin-pages/team-settings/assignments/assignments.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient) { }

  callGetAssignmentsConfig(): Observable<HttpResponse<Getassignmentsresponse>> {
    console.log('In callGetAssignmentsConfig in service');
    return this.http.get<Getassignmentsresponse>(environment.appUrl + '/assignmentconfigs', {observe: 'response'});
  }

  callPostAssignmentsConfig(addAssignmentArray: AddAssignment[]): Observable<Addassignmentsresponse> {
    console.log('In callPostAssignmentsConfig in service');
    return this.http.post<Addassignmentsresponse>(environment.appUrl + '/', addAssignmentArray, httpOptions).pipe(
      retry(3)
    );
  }

  callDeleteAssignmentsConfig(ids: number): Observable<Deleteresponse> {
    const error: any = 'something wrong happened';
    const url = environment.appUrl + '/assignmentconfigs/' + ids;
    console.log('In callDeleteAgentRoleConfig method in service and url is ' + url);
    return this.http.delete<Deleteresponse>(url , httpOptions).pipe(
      catchError(error)
    );
  }
}
