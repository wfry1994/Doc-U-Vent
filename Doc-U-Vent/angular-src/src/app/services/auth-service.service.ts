import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { DatabaseService } from './database.service';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private userIsLoggedIn: boolean = false;
  private userSub: any;
  private userRoleSub: any;

  constructor(private router: Router, private fireAuth: AngularFireAuth, private db: DatabaseService, private storage: LocalStorageService) {
    this.fireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.storage.setAuthenticatedUser(res);
        this.userIsLoggedIn = true;
        this.getAuthenticatedUserByEmail();
        this.getAuthenticatedUserRole();
      } else {
        this.userIsLoggedIn = false;
      }
    });
  }

  doEmailLogin(email: string, password: string) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  doRegisterWithEmail(email: string, password: string) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.userIsLoggedIn = false;
    this.storage.removeUserFromStorage();
    this.userRoleSub.unsubscribe();
    this.userSub.unsubscribe();
    this.router.navigate(['/home']);
  }

  isUserLoggedIn(): boolean {
    return this.userIsLoggedIn;
  }

  checkUserLoginStatus() {
    return this.fireAuth.authState.pipe(first()).toPromise();
  }

  async canActivate(): Promise<boolean> {
    let user = await this.checkUserLoginStatus();
    if (user) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      this.storage.removeUserFromStorage();
      return false;
    }
  }

  userIsAdmin() {
    var userRole = this.storage.getUserRole();
    if (userRole === null || userRole === undefined) {
      return false;
    }
    return userRole === "admin";
  }

  userIsFaculty() {
    var userRole = this.storage.getUserRole();
    if(userRole === null || userRole === undefined){
      return false;
    }

    return userRole === "faculty";
  }

  getAuthenticatedUserByEmail() {
    this.userSub = this.db.getUserByEmail().valueChanges().subscribe(user => {

      if(user.length === 0) {
        this.db.createUser(this.storage.getUserId(),new User(this.storage.getUserEmail(),this.storage.getUserId()));
        this.storage.setUser({email: this.storage.getUserEmail(), userId: this.storage.getUserId()});
      } else {
        this.storage.setUser(user);
      }
    }, err => {
      console.log(err);
    });
  }

  getAuthenticatedUserRole() {
    this.userRoleSub = this.db.getUserRoleById().valueChanges().subscribe(role => {
      this.storage.setUserRole(role);
    }, err => {
      console.log(err);
    });
  }

  resetPassword(email: string) {
    return this.fireAuth.auth.sendPasswordResetEmail(email);
  }

}
