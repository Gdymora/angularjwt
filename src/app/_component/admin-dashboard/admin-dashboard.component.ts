import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ApiService } from '../../_services/api.service';
import { Policy } from  '../../_models/policy';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
 model: any = {};
//dataFromServer: any = [];

policies: Policy[]

selectedPolicy:  Policy  = { 
  id: null,
  user_id:   null,
  title:   null,
  post:   null,
  price:  null,
  currency:   null,
  status: null,
  message: null,
}


constructor(
  private authService: AuthService,
  private apiService: ApiService
) { }

ngOnInit() {
  this.apiService.readPolicies().subscribe(response=>{
    if (response['status'] === 'success') {        
      this.policies = response['data'];
      console.log(this.policies );
    }else if (response['status'] === 'not post') {
      this.policies = response['data'];
      console.log(this.policies );
    }
  }, error => {
        this.authService.logout();
      }); 
  console.log("UserDashboard")
}

selectPolicy(policy: Policy){
  this.selectedPolicy = policy;
}

createOrUpdatePolicy(form){
   if(this.selectedPolicy && this.selectedPolicy.id){  
    form.value.id=this.selectedPolicy.id

    this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
      console.log("Policy updated", policy);
    });
  }
  else{
    this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
      console.log("Policy created, ", policy);
    });
  }

}

deletePolicy(id: number){
  this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
    console.log("Policy created, ", policy);
  });
}


logout(){
  this.authService.logout();
}
}