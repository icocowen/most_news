import { Component, OnInit, Sanitizer, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User, getUser } from '../../entity/user.entity';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsServerService } from '../../data/news-server.service';
import { LoginService } from '../../utility/login.service';
import { SharedServerService } from '../../utility/shared-server.service';
import { NotifyService } from '../../utility/notify.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  public user : User;
  public userBg ;
  productSet;
  isHasProduct: boolean;
  isShowMore: boolean;
  isHasCollect: boolean;
  collectSet;
  isHasSubscribe: boolean;
  subscribeSet: any;
  targetUid: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private domSanitizer :DomSanitizer ,
    private server :NewsServerService,
    private auth: LoginService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.notify.notify();
    this.server.getData().subscribe(d => {
      if(d.length > 5) {
        this.productSet = d.slice(0,5);
        this.isHasCollect = true;
        this.collectSet = d.slice(0,5);
        this.isShowMore = true;
        this.isHasSubscribe = true;
      }
    });
    this.isHasProduct = true;
    // snapshot.paramMap.get('id')
    this.targetUid = '';
    this.activatedRoute.paramMap.subscribe(d => {
      this.targetUid = d.get('id');
      this.enterUserHome();
    });


    
    
    this.userBg = this.domSanitizer.bypassSecurityTrustStyle("url('./assets/bg.jpeg')"); //这个是Stack Overflow的方案，感谢


  }

  enterUserHome(){
    this.auth.enterHomePage(this.targetUid).subscribe(uo => {
      if(uo != null && uo['code'] === '0000150') { //自己的主页
        this.user = uo['data'] as User;
      }else if(uo != null && uo['code'] === '0000151') {//他人的主页
        this.user = uo['data'] as User;
      }
    });
  }
}
