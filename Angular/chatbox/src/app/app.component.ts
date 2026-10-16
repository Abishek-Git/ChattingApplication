import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chatter';
  users : any = [];
  authUser : any;
  logged : boolean = false;
  onChat : boolean = false;

  constructor(private messageService : MessageService, private userService : UserService, private route: Router){
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.onChat = e.urlAfterRedirects.startsWith('/chat');
      }
    });
  }

  ngOnInit(): void {
    const stored = sessionStorage.getItem("authuser");
    this.authUser = stored ? JSON.parse(stored) : null;
    this.logged = this.authUser != null;
    this.userService.getAllUsers().subscribe(data=>{
      this.users = data;
    })
  }

  initials(name : string){
    if (!name) { return '?'; }
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }

  goChat(userId : any){
    this.route.navigate(['chat/'+ userId])
  }
  logout(){
    sessionStorage.removeItem("authuser")
    this.authUser = null;
    this.logged = false;
    this.route.navigate(['login'])
  }
}
