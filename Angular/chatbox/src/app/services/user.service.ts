import { Injectable } from '@angular/core';
import {User} from 'src/app/entity/User';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  restUrl :  string = "http://localhost:8080/chatter/";
  httpOptions = {
    headers : new HttpHeaders({
      'content-Type' : 'application/json'
    })
  }

  login(user:any){
    return this.http.put(this.restUrl + "login", user);
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.restUrl+"allusers");
  }
  
  userById(id : any):Observable<User>{
    return this.http.get<User>(this.restUrl+"userbyid/"+id);
  }
}
