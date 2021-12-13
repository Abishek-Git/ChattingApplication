import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../entity/Message';
import { MessageService } from '../services/message.service';
import * as $ from 'jquery';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.css']
})
export class ChatpageComponent implements OnInit {
  constructor(private aroute: ActivatedRoute, private messageService : MessageService, private userService : UserService) { }
  userId: any;
  receiver : any;
  authUser : any;
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
    this.userId = this.aroute.snapshot.params['userId'];
    this.userService.userById(this.userId).subscribe(data=>{
      this.receiver = data
      this.authUser = sessionStorage.getItem("authuser")
    this.authUser = JSON.parse(this.authUser)
    this.message.senderId.userId = this.authUser.userId
    this.message.receiverId.userId = this.userId
    
    this.messages = this.messageService.getMessageBySenderId(this.authUser.userId, this.userId).subscribe(data=>{
      this.messages = data
      this.messageService.getMessageBySenderId(this.userId, this.authUser.userId).subscribe(data=>{
        this.allmsg = data
        this.messages = this.messages.concat(this.allmsg)
      })
    })
    })
    
    
    
  
  }

 

  
    sendMessage(){
      console.log(this.message);
      
    this.messageService.setMessage(this.message).subscribe(data=>{

    });
    window.location.reload();
  }

  rclass : string= "message-data text-right"
  dclass : string = "message-data"
  set(id : number){
    console.log(this.messages);
    if(id == this.authUser.userId){
      console.log(id + " "+ this.authUser.userId);
      
      return this.rclass;
    }
      return this.dclass;
  }

  nofloatClass : any = "message other-message"
  floatRight : any = "message other-message  float-right"
  setMsgFLoat(id : number){
    console.log(this.messages);
    if(id == this.authUser.userId){
      console.log(id + " "+ this.authUser.userId);
      
      return this.floatRight;
    }
      return this.nofloatClass;
  }

}
