import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ApiService } from '../../_services/api.service';
import { Policy } from  '../../_models/policy';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  fileData: File = null;

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
    fileData: null
  }
  id:number;
 
  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) { 
   
  }
 
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

  // Image Preview
  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0]; 
    console.log(file );   
  }

  selectPolicy(policy: Policy){
    this.selectedPolicy = policy;
  }
   
  createOrUpdatePolicy(form){
     if(this.selectedPolicy && this.selectedPolicy.id){  
      form.value.id=this.selectedPolicy.id
      this.apiService.updatePolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy updated", policy);
        this.onRemove(policy);
      });

    }
    else{
     
        console.log(form);  
      this.apiService.createPolicy(form.value).subscribe((policy: Policy)=>{
        console.log("Policy created, ", policy);
        this.onCreate(policy);
      });
    }

  }

  deletePolicy(id: number, idelement:any){
    this.apiService.deletePolicy(id).subscribe((policy: Policy)=>{
      console.log("Policy created, ", policy);
    });
    this.onRemove(idelement);
  }

  onRemove(idelement:any){ 
    console.log(this.policies[idelement]);
    console.log(idelement.id);
    this.id = idelement.id;
  
    for(var i = 0;i < this.policies.length; i++){
      if(idelement.id == this.policies[i].id){
        console.log(this.policies[i].id);
        this.policies.splice(i,1);
          break;
      }
     }
    }
  
  onUpdate(idelement:any){ 
      this.id = idelement.id;
  
    for(var i = 0;i < this.policies.length; i++){
      if(idelement.id == this.policies[i].id){
        console.log(this.policies[i].id);
        this.policies.splice(i,0,this.policies[i]);
          break;
      }
     }
       
  }

  onCreate(policy:any){ 
      this.policies.push(policy);
      console.log(policy);
       
  }

  logout(){
    this.authService.logout();
  }
}
