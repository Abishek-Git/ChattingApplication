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
  constructor(private route:Router, private userService : UserService) { }
  ngOnInit(): void {
    this.authUser = sessionStorage.getItem("authuser")
    this.authUser = JSON.stringify(this.authUser)
  }

  login(){
    this.userService.login(this.user).subscribe(data=>{
      this.authUser = JSON.stringify(data);
      sessionStorage.setItem("authuser",this.authUser)
    console.log(this.authUser);
    })
    

  }
  logout(){
    sessionStorage.removeItem("authuser")
  }

}
