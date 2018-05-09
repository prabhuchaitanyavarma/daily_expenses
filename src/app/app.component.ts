import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) { }

  ngOnInit() {
  	// this.router.navigate(['login']);
  }

  isLogin() {
    let page = window.location.pathname.split('/')[1]
    if (page == 'login') {
      return false;
    }
    else {
      return true;
    }
  }


}
