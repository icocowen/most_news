import { Component, OnInit } from '@angular/core';
import { SharedServerService } from '../utility/shared-server.service';
import { User } from '../entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public ifLogin: boolean;
  public user: User;
  public notification: number = 5;
  public mail: number = 4;
  public data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.',
    'Los Angeles battles huge wildfires.'
  ];


  constructor(
    private _sharedServer: SharedServerService,
    private cookieService: CookieService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    if (this.cookieService.check('user')) {
      let uStr = this.cookieService.get('user');
      this.ifLogin = true;
      this.user = JSON.parse(uStr) as User;
      console.log(this.user);

    }
    this._sharedServer.changeEmitted$.subscribe(d => {
      if(d == 'login'){
        let uStr = this.cookieService.get('user');
        this.ifLogin = true;
        this.user = JSON.parse(uStr) as User;
        console.log(this.user);
      }
    })
    
  }


  logout(){
    this.ifLogin = false;
    this._sharedServer.emitChange("logout");
    this.cookieService.delete('user');
    this.message.warning("注销成功");
  }

}
