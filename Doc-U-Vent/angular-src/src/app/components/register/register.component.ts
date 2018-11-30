import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth-service.service';
import { User } from '../../models/user.model';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 loading = false;
 email : string;
 password: string;
 errorMessage: string = "";

  constructor(private router:Router, private authService: AuthService, private db: DatabaseService)
  {

  }

  ngOnInit() {
    if(this.authService.isUserLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  register()
  {
    this.loading = true;
    this.authService.doRegisterWithEmail(this.email, this.password)
    .then(res => {
      this.db.createUser(res.user.uid,new User(this.email.toLowerCase(), res.user.uid));
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.loading = false;
      console.log(err);
      this.errorMessage = err.message;
  });

  }

}
