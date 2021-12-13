import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatpageComponent } from './chatpage/chatpage.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'chat/:userId', component: ChatpageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
