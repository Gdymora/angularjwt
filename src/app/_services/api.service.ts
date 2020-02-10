import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from  '../_models/policy';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://angular.propan.top/backend";

  constructor(private httpClient: HttpClient) { }

  indexPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/index.php`);
  }

  readPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createPolicy(policy: Policy): Observable<Policy>{   
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }

  updatePolicy(policy: Policy){
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/update.php`, policy);   
  }

  deletePolicy(id: number){
    return this.httpClient.get<Policy>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

}
