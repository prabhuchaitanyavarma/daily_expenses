import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class HelperMethodsService {
	public TOKEN = 'token';
	constructor() {}

  	checkStatus(data){
  		return data.status == "success" ? true : false
  	}

  	isLoggedIn(){
  		var token = sessionStorage.getItem(this.TOKEN);
  		return token ? true : false
  	}

}
