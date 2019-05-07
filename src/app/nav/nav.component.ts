import { Component, OnInit } from '@angular/core';
import { SharedServerService } from '../utility/shared-server.service';
import { User, getUser } from '../entity/user.entity';
import { CookieService } from 'ngx-cookie-service';
import { NzMessageService } from 'ng-zorro-antd';
import { LoggerService } from 'ng-zorro-antd/core/util/logger/logger.service';
import { LoginService } from '../utility/login.service';
import { NotifyService } from '../utility/notify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public ifLogin: boolean;
  public user: User;
  public notification: number = 0;
  public isHasProduct: boolean;
  public productSet;
  public data = [];
  noids: any;

  constructor(
    private _sharedServer: SharedServerService,
    private cookieService: CookieService,
    private message: NzMessageService,
    private auth: LoginService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
   

    this.login();
    this._sharedServer.changeEmitted$.subscribe(d => {
      if(d == 'login'){
       this.login();
      }
    });
    this.notify.notify();

    this.notify.changeEmitted$.subscribe(d => {

      this.notification = d['notifyNum'];
      if(d != null && d['notifys'] != null ) {
       
        this.data = d['notifys'];
        this.noids = d['noids'];
      }
    });
  }


  seen(){
    this.auth.seen(this.noids).subscribe();
    this.notification = 0;
  }
  login(){
    this.auth.checkStatus().subscribe(d => {
      if(d) {
        this.user = d['data'] as User;
        this.ifLogin = true;
      }
    });
  }


  logout(){
    this.auth.logout().subscribe(
      d => {
        this.message.warning(d['msg']);
      }
    );
    this.ifLogin = false;
    this._sharedServer.emitChange("logout");
    
  }

}
