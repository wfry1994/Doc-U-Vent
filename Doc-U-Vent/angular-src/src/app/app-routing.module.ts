import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterventionComponent} from './components/intervention/intervention.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { ViewInterventionsComponent } from './components/view-interventions/view-interventions.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {InterventionGridComponent} from './components/intervention-grid/intervention-grid.component';
import {HomeComponent} from './components/home/home.component';
import {EditRolesComponent} from './components/edit-roles/edit-roles.component';
import {AssignGroupsComponent} from './components/assign-groups/assign-groups.component';
import {ClinicalGroupsComponent} from './components/clinical-groups/clinical-groups.component';
import {DeleteUsersComponent} from './components/delete-users/delete-users.component';
import {CreateSchoolsComponent} from './components/create-schools/create-schools.component';



import {AuthService} from './services/auth-service.service';

const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthService]},
  {path: 'intervention', component: InterventionComponent, canActivate: [AuthService]},
  {path: 'about', component:AboutComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'intervention-grid', component: InterventionGridComponent, canActivate: [AuthService]},
  {path: 'edit-roles', component: EditRolesComponent, canActivate: [AuthService]},
  {path: 'assign-groups', component: AssignGroupsComponent, canActivate: [AuthService]},
  {path: 'clinical-groups', component: ClinicalGroupsComponent, canActivate: [AuthService]},
  {path: 'delete-users', component: DeleteUsersComponent, canActivate: [AuthService]},
  //{path: 'create-schools', component: CreateSchoolsComponent, canActivate: [AuthService]},
  {path: '**',component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})

export class AppRoutingModule {}
