import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
	public TOKEN = 'token';
	result: any;
	headers: any;
	url: any;
 	constructor(private http: Http) {
 		this.url = "https://whispering-earth-17077.herokuapp.com/api/v1";
 	}

 	addHeaders(){
 		this.headers = new Headers();
 		var token = sessionStorage.getItem(this.TOKEN);
 		this.headers.append("Authorization", "Token token="+token);
 	}

 	login(params) {
 		this.addHeaders()
 		return this.http.post(this.url+"/login", params, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

 	categories(duration) {
 		this.addHeaders()
 		return this.http.get(this.url+"/categories?duration="+duration, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

 	graphInfo(duration) {
 		this.addHeaders()
 		return this.http.get(this.url+"/dashboard?duration="+duration, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}


 	expensesByDate(month, year) {
 		this.addHeaders()
 		return this.http.get(this.url+"/expenses_by_date?month="+month+"&year="+year, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

 	addExpense(params){
 		this.addHeaders()
 		return this.http.post(this.url+"/add_expense", params, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

 	editExpense(params){
 		this.addHeaders()
 		return this.http.post(this.url+"/edit_expense", params, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

 	deleteExpense(params){
 		this.addHeaders()
 		return this.http.post(this.url+"/delete_expense", params, new RequestOptions({headers: this.headers})).map(res => res.json()).catch(this.handleError);
 	}

  public handleError = (err) => {
    return Observable.throw(err);
  }

}
