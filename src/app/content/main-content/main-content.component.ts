import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { JsonPipe } from '@angular/common';
import { SharedServerService } from 'src/app/utility/shared-server.service';

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
    private _sharedServer: SharedServerService
  ) { }

  ngOnInit() {
    if (this.cookieService.check('user')) {
      let uStr = this.cookieService.get('user');
      this.ifLogin = true;
      this.user = JSON.parse(uStr) as User;
    }
    this._sharedServer.changeEmitted$.subscribe(t => { //监听注销事件
      if(t == 'logout') {
        this.ifLogin = false;
      }
    })
  }
  

  login(u: User) {
    // console.log(u);
    this.user = u;
    this.ifLogin = true;
    this.cookieService.set('user', new JsonPipe().transform(u), 1);
    
  }
}
