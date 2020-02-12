import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Policy } from  '../_models/policy';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "https://angular.propan.top/backend";

  constructor(private httpClient: HttpClient, private http:HttpClient) { }

  indexPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/index.php`);
  }

  readPolicies(): Observable<Policy[]>{
    return this.httpClient.get<Policy[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createPolicy(policy: Policy): Observable<Policy>{   
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy);
  }
/*
  createFilePolicy(policy: Policy, fileToUpload: File): Observable<Policy>{  
    const formData: FormData = new FormData();
    formData.append('picture', fileToUpload);    
    //policy.fileData=fileToUpload;
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/create.php`, policy,);
  }
*/
  updatePolicy(policy: Policy){
    return this.httpClient.post<Policy>(`${this.PHP_API_SERVER}/api/update.php`, policy);   
  }

  deletePolicy(id: number){
    return this.httpClient.get<Policy>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }

  postFile(fileToUpload: File): Observable<Object> {   
    const formData: FormData = new FormData();
    formData.append('picture', fileToUpload);
    return this.httpClient.post(`${this.PHP_API_SERVER}/upload.php`, formData).pipe( map(() => { return true; }));
  }

}