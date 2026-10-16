import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../entity/Message';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {
  constructor(private aroute: ActivatedRoute, private router: Router, private messageService : MessageService, private userService : UserService) { }
  userId: any;
  receiver : any = {};
  authUser : any;
  users : any = [];
  message : Message = {
    message: '',
    messageId: 0,
    receiverId: {
      email: '',
      name: '',
      password: '',
      userId: 0
    },
    roomId: 0,
    senderId: {
      email: '',
      name: '',
      password: '',
      userId: 0
    },
    time: undefined
  }
  messages : any = [];
  allmsg : any = [];

  
  ngOnInit(): void {
    const stored = sessionStorage.getItem("authuser");
    this.authUser = stored ? JSON.parse(stored) : null;
    if (this.authUser == null) {
      this.router.navigate(['login']);
      return;
    }
    this.userService.getAllUsers().subscribe(data => {
      this.users = (data as any[]).filter(u => u.userId != this.authUser.userId);
    });
    this.aroute.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadConversation();
    });
  }

  loadConversation(): void {
    this.messages = [];
    this.message.senderId.userId = this.authUser.userId;
    this.message.receiverId.userId = this.userId;
    this.userService.userById(this.userId).subscribe(data => {
      this.receiver = data;
    });
    this.messageService.getMessageBySenderId(this.authUser.userId, this.userId).subscribe(sent => {
      this.messageService.getMessageBySenderId(this.userId, this.authUser.userId).subscribe(received => {
        this.messages = (sent as any[]).concat(received as any[]);
      });
    });
  }

  openChat(userId : any): void {
    this.router.navigate(['chat/' + userId]);
  }

  sendMessage(): void {
    if (!this.message.message || !this.message.message.trim()) {
      return;
    }
    this.messageService.setMessage(this.message).subscribe(() => {
      this.message.message = '';
      this.loadConversation();
    });
  }

  isMine(msg : any): boolean {
    return msg && msg.senderId && this.authUser && msg.senderId.userId == this.authUser.userId;
  }

  initials(name : string): string {
    if (!name) { return '?'; }
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
  }

}
