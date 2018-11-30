import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setUserRole(userRole: any): void {
    if(userRole.length == 0) {
      localStorage.setItem('role', JSON.stringify("student"));
    } else {
      localStorage.setItem('role', JSON.stringify(userRole));
    }
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setAuthenticatedUser(user: any) {
    var authenticatedUser = user.user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  }


  getUserRole() {
    let userRoleInfo = JSON.parse(localStorage.getItem('role'));
    if(userRoleInfo === null) {
      return;
    }
    return userRoleInfo[0].role;
  }

  getUserClinicalGroup() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user === null) {
      return;
    } else {
      return user[0].clinicalGroup === undefined ? "none" : user[0].clinicalGroup;
    }
  }

  getUserEmail() {
    let user = JSON.parse(localStorage.getItem('authenticatedUser'));
    if (user === null) {
      return;
    }

    return user.email;
  }

  getUserId() {
    return JSON.parse(localStorage.getItem('authenticatedUser')).uid;
  }

  getAuthenticatedUser() {
    return JSON.parse(localStorage.getItem('authenticatedUser'));
  }

  removeUserFromStorage() {
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }

}
