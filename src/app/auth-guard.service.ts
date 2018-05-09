import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { HelperMethodsService } from './helper-methods.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private helper: HelperMethodsService) { }

  canActivate() {
    if (!this.helper.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
