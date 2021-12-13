import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatbox';
  users : any = [];
  authUser : any;
  logged : any;
  ngOnInit(): void { 
    this.authUser = localStorage.getItem("authuser")
    this.authUser = JSON.stringify(this.authUser)
    this.userService.getAllUsers().subscribe(data=>{
      this.users = data;
    })
  if(this.authUser == null){
    this.logged = false
  }else{
    this.logged = true
  }    
  }

  constructor(private messageService : MessageService, private userService : UserService, private route: Router){}
  goChat(userId : any){
    this.route.navigate(['chat/'+ userId])
  }
  logout(){
    sessionStorage.removeItem("authuser")
    this.route.navigate(['login'])
  }
}
