import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/*Angular material*/
import {MaterialModule} from './material.module';

/*MD bootstrap*/
import { MDBBootstrapModule } from 'angular-bootstrap-md';

/*firebase*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';


/*Services*/
import {InterventionService} from './services/intervention.service';
import {AuthService} from './services/auth-service.service';
import {DatabaseService} from './services/database.service';
import {LocalStorageService} from './services/local-storage.service';

/*Application components*/
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { ViewInterventionsComponent } from './components/view-interventions/view-interventions.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InterventionComponent} from './components/intervention/intervention.component';
import { PageNotFoundComponent } from './page-not-found.component';
import {InterventionGridComponent} from './components/intervention-grid/intervention-grid.component';
import {FooterComponent} from './components/footer/footer.component';
import {EditRolesComponent} from './components/edit-roles/edit-roles.component';
import {AssignGroupsComponent} from './components/assign-groups/assign-groups.component';
import {ClinicalGroupsComponent} from './components/clinical-groups/clinical-groups.component';
import {DeleteUsersComponent} from './components/delete-users/delete-users.component';
import {CreateSchoolsComponent} from './components/create-schools/create-schools.component';

/*ag-Grid*/
import {AgGridModule} from 'ag-grid-angular';

/*Router component*/
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    InterventionComponent,
    HelpComponent,
    ViewInterventionsComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    InterventionGridComponent,
    FooterComponent,
    EditRolesComponent,
    AssignGroupsComponent,
    ClinicalGroupsComponent,
    DeleteUsersComponent,
    CreateSchoolsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    AgGridModule.withComponents([ViewInterventionsComponent]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [InterventionService, AuthService, DatabaseService, LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents:[InterventionComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule{}
