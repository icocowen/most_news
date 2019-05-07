import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { JsonPipe } from '@angular/common';
import { SharedServerService } from '../../utility/shared-server.service';
import { LoginService } from '../../utility/login.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {

  public ifLogin: boolean;
  public user: User;

  constructor(
    private cookieService: CookieService,
    private _sharedServer: SharedServerService,
    private auth: LoginService
  ) { }

  ngOnInit() {

    this.auth.checkStatus().subscribe(u => {
      if(u) {
        this.user = u['data'] as User;
        this.ifLogin = true;
      }
    });

    this._sharedServer.changeEmitted$.subscribe(d => {
      if(d == 'logout'){
        this.ifLogin = false;
      }
    })
   
  }
  

  login(u: User) {
    
    this.ifLogin = true;
    this.user = u;
    
  }
}
