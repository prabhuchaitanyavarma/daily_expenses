import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HelperMethodsService } from '../helper-methods.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public TOKEN = 'token';
  email: any;
  password: any;

  constructor(public toastr: ToastsManager, public restApi: DataService, public router: Router, vcr: ViewContainerRef, public helpers: HelperMethodsService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {}

  login() {
    var crdentials = {email: this.email, password: this.password}
  	this.restApi.login({user: crdentials})
  	.subscribe(data => {
      if(this.helpers.checkStatus(data)){
        this.toastr.success(data.message, 'Success');
        this.router.navigate(['expenses']);
        console.log(data.authentication_token)
        sessionStorage.setItem(this.TOKEN, data.authentication_token);
      }else{
        this.toastr.error(data.message, 'Oops!');
      }
  	})
  }

}
