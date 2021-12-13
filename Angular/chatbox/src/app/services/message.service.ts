import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http : HttpClient){}
  restUrl :  string = "http://localhost:8080/chatter/";
  httpOptions = {
    headers : new HttpHeaders({
      'content-Type' : 'application/json'
    })
  }

  



  getMessageBySenderId(senderid : any,receiverid: any):Observable<Message[]>{
    return this.http.get<any>(this.restUrl+"msgbysenderid/"+senderid+"/"+receiverid );
  }


  // getMessageByReceiverId(userid : any):Observable<Message[]>{
  //   return this.http.get<any>(this.restUrl+"msgbyreceiverid/"+userid );
  // }

  setMessage(message : any){
    return this.http.post<any>(this.restUrl+'setmessage', JSON.stringify(message), this.httpOptions);
  }
}
