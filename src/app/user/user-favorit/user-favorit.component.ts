import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedServerService } from '../../utility/shared-server.service';
import { NzMessageService } from 'ng-zorro-antd';
import { NewsServerService } from '../../data/news-server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../utility/notify.service';

@Component({
  selector: 'app-user-favorit',
  templateUrl: './user-favorit.component.html',
  styleUrls: ['./user-favorit.component.css']
})
export class UserFavoritComponent implements OnInit {
  uid: string;
  totalNum: any;
  owner: boolean = true;
  collectSet: any;
  pageindex: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private server :NewsServerService,
    private nzMessageService: NzMessageService,
    private notify: NotifyService
    ) { }

  ngOnInit() {
    this.notify.notify();
    // this.getDataUpdate();
    this.activatedRoute.parent.url.subscribe(p => {
      this.uid = p[1].path;
    });
    this.getFavorite(this.uid);
    this.total();
  }


  delFavorite(nid: string){

    if(this.collectSet.length == 1 && (Number)(this.pageindex)  > 1) {
      this.pageindex = ((Number)(this.pageindex) - 1).toString();
     }
    this.server.delFvorite(nid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000163'){
          this.getFavorite(this.uid, this.pageindex);
          this.nzMessageService.success(d['msg']);
          this.total();
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
  }

  

  getFavorite(uid:string, i = '1') {
    this.server.pullHomePavorite(uid, i).subscribe(d=>{
      if(d != null && d['code'] === '0000156'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000158'){
        this.owner = false;
      }
      if(d != null){
        this.collectSet = d['data'];
      }else{
        this.collectSet = null;
      }
    });

  }
  
  total() {
    this.server.total(this.uid,'f').subscribe(d => {
      if(d !=null && d['code'] === '0000178') {
        this.totalNum = d['data'];
      }else{
        this.totalNum = 0;
      }
    });
  }

  changePage(num: Number){
   this.pageindex = num.toString();
   this.server.pullHomePavorite(this.uid,num.toString()).subscribe(d=>{
   
     
      if(d != null && d['code'] === '0000156'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000158'){
        this.owner = false;
      }
      if(d != null ){
        this.collectSet = d['data'];
      }else{
        this.collectSet = null;
      }
    });
  }
}
