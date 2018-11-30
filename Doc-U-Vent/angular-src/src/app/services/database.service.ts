import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  universitiesRef: AngularFireList<any>;
  interventionsRef: AngularFireList<any>;
  usersRef: AngularFireList<any>;
  userRolesRef: AngularFireList<any>;
  clinicalGroupsRef: AngularFireList<any>;
  userId: string = "";
  filters = {};

  constructor(private db: AngularFireDatabase, private storage: LocalStorageService) {
    this.interventionsRef = this.db.list('interventions');
    this.usersRef = this.db.list('users');
    this.userRolesRef = this.db.list('userRoles');
    this.clinicalGroupsRef = this.db.list('clinicalGroups');
    this.universitiesRef = this.db.list('universities');
  }

  private applyFilters(items): Array<any> {
    items = _.filter(items, _.conforms(this.filters));
    this.filters = {};
    return items;
  }

  filterGreaterThan(items: Array<any>, property: string, rule: number): Array<any> {
    this.filters[property] = val => val >= rule;
    return this.applyFilters(items);
  }

  filterNotEqualTo(items: Array<any>, property: string, rule: string) : Array<any>{
    this.filters[property] = val => val !== rule;
    return this.applyFilters(items);
  }

  submitIntervention(intervention: any) {
    return this.interventionsRef.push(intervention);
  }

  updateIntervention(interventionId: string, intervention: any) {
    return this.interventionsRef.update(interventionId, intervention);
  }

  getInterventionsByUserId(userId: string) {
    return this.db.list('interventions', ref => ref.orderByChild('user_id').equalTo(userId)).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  getInterventionsByClinicalGroup() {
    let clinicalGroup = this.storage.getUserClinicalGroup();
    return this.db.list('interventions', ref => ref.orderByChild('clinicalGroup').equalTo(clinicalGroup)).snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  getInterventions() {
    return this.db.list('interventions').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  getUserByEmail() {
    let userEmail = this.storage.getUserEmail();
    if (userEmail === undefined) {
      userEmail = "";
    }
    return this.db.list('users', ref => ref.orderByChild('email').equalTo(userEmail).limitToFirst(1));
  }

  createUser(userId, user: any) {
    this.usersRef.set(userId, user);
  }

  getUsers() {
    return this.db.list('users').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  updateUserRole(userId, userRole) {
    let newUserRole = { role: userRole, userId: userId };
    return this.userRolesRef.update(userId, newUserRole);
  }

  updateUser(userId, user) {
    return this.usersRef.update(userId, user);
  }

  setUser(userId, user){
    delete user['key'];
    return this.usersRef.set(userId,user);
  }

  getUserRoleById() {
    let userId = this.storage.getUserId();
    return this.db.list('userRoles', ref => ref.orderByChild('userId').equalTo(userId).limitToFirst(1));
  }

  getUserRoles(): any {
    return this.db.list('userRoles').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  createClinicalGroup(group: any) {
    return this.clinicalGroupsRef.push(group);
  }

  deleteClinicalGroup(groupKey: any) {
    return this.clinicalGroupsRef.remove(groupKey);
  }

  getClinicalGroups() {
    return this.db.list('clinicalGroups').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  updateClinicalGroup(groupId: string, group: any) {
    return this.clinicalGroupsRef.update(groupId, group);
  }

  removeUser(userId: string): void {
    this.usersRef.remove(userId);
  }

  removeIntervention(interventionKey: string) : void {
    this.interventionsRef.remove(interventionKey);
  }

  removeUserRole(userId: string): void {
    this.userRolesRef.remove(userId);
  }

  createUniversity(university: any){
    return this.universitiesRef.push(university);
  }

  getUniversities() {
    return this.db.list('universities').snapshotChanges().pipe(
      map(changes => changes.map(c => ({ key: c.key, ...c.payload.val() }))));
  }

  deleteUniversity(schoolKey: string) {
    return this.universitiesRef.remove(schoolKey);
  }

}
