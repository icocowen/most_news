import { Component, OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../../entity/user.entity';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsServerService } from '../../data/news-server.service';
import { SharedServerService } from '../../utility/shared-server.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NotifyService } from '../../utility/notify.service';

@Component({
  selector: 'app-user-subscription',
  templateUrl: './user-subscription.component.html',
  styleUrls: ['./user-subscription.component.css']
})
export class UserSubscriptionComponent implements OnInit {

  public user : User;
  public userBg ;
  productSet;
  isHasProduct: boolean;
  isShowMore: boolean;
  isHasCollect: boolean;
  collectSet; 
  isHasSubscribe: boolean;
  subscribeSet: any;
  totalNum: any;
  pageindex: string;
  owner: boolean;
  uid: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private server :NewsServerService,
    private nzMessageService: NzMessageService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.notify.notify();
    this.activatedRoute.parent.url.subscribe(p => {
      this.uid = p[1].path;
    });
    this.total();
    this.getSub(this.uid);
  }

  getSub(uid:string, i = '1') {
    this.server.pullHomeSub(uid, i).subscribe(d=>{

      if(d != null && d['code'] === '0000159'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000160'){
        this.owner = false;
      }
      if(d != null){
        this.subscribeSet = d['data'];
      }else{
        this.subscribeSet = null;
      }
    });
  }

  cancelSub(tid: string){
    if(this.subscribeSet.length == 1 && (Number)(this.pageindex)  > 1) {
      this.pageindex = ((Number)(this.pageindex) - 1).toString();
     }
    this.server.cancelSub(tid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000164'){
          this.getSub(this.uid, this.pageindex);
          this.nzMessageService.success(d['msg']);
          this.total();
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
  }

  total() {
    this.server.total(this.uid,'s').subscribe(d => {
      if(d !=null && d['code'] === '0000178') {
        this.totalNum = d['data'];
      }else{
        this.totalNum = 0;
      }
    });
  }

  changePage(num: Number){
   this.pageindex = num.toString();
   this.server.pullHomeSub(this.uid,num.toString()).subscribe(d=>{
     
      if(d != null && d['code'] === '0000159'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000160'){
        this.owner = false;
      }
      if(d != null){
        this.subscribeSet = d['data'];
      }else{
        this.subscribeSet = null;
      }
    });
  }
}


