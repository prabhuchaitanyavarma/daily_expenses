import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public TOKEN = 'token';
  constructor(private router: Router) {
  }

  ngOnInit() {
  	let page = window.location.pathname.split('/')[1]
  	let root = page=='dashboard' ? window.document.querySelector(".dashboard") : window.document.querySelector(".expenses")
  	root.className += " active";
  }

  liClicked(page){
  	let dashboard = window.document.querySelector(".dashboard");
  	let expenses = window.document.querySelector(".expenses");
  	dashboard.classList.remove("active");
  	expenses.classList.remove("active");
  	let root = page == 'dashboard' ? dashboard : expenses
  	root.className += " active";
  }

  signOut(){
  	sessionStorage.removeItem(this.TOKEN);
  }

}
