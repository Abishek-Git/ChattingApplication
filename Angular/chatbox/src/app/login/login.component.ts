import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email : "",
    password : ''
  }
   authUser : any;
   error : boolean = false;
  constructor(private route:Router, private userService : UserService) { }
  ngOnInit(): void {
    const stored = sessionStorage.getItem("authuser");
    this.authUser = stored ? JSON.parse(stored) : null;
  }

  login(){
    this.error = false;
    this.userService.login(this.user).subscribe({
      next : (data : any) => {
        if (data) {
          sessionStorage.setItem("authuser", JSON.stringify(data));
          window.location.href = '/';
        } else {
          this.error = true;
        }
      },
      error : () => { this.error = true; }
    });
  }
  logout(){
    sessionStorage.removeItem("authuser")
    this.authUser = null;
  }

}
