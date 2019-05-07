import { Component, OnInit, ViewChild } from '@angular/core';
import { DymanicInfoComponent } from '../dymanic-info/dymanic-info.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsServerService } from '../../data/news-server.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SharedServerService } from '../../utility/shared-server.service';
import { NotifyService } from '../../utility/notify.service';

@Component({
  selector: 'app-up-load-product',
  templateUrl: './up-load-product.component.html',
  styleUrls: ['./up-load-product.component.css']
})
export class UpLoadProductComponent implements OnInit {
  owner: boolean = true;
  productSet: any;
  uid: string;
  totalNum: any;
  pageindex: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private server :NewsServerService,
    private router: Router,
    private nzMessageService: NzMessageService,
    private notify: NotifyService
  ) { }

  ngOnInit() {
    this.notify.notify();
    // this.getDataUpdate();
    this.activatedRoute.parent.url.subscribe(p => {
      this.uid = p[1].path;
    });
    this.getProduct(this.uid);
    this.total();
  }

  editorConfirm(uid:string){
    this.router.navigate(['../../release', uid]);
  }

  confirm(id: string): void {
    if(this.productSet.length == 1 && (Number)(this.pageindex)  > 1) {
      this.pageindex = ((Number)(this.pageindex) - 1).toString();
     }
    this.server.delProduct(id).subscribe(
      d => {
        if(d!=null && d['code'] === '0000162'){
          this.getProduct(this.uid,this.pageindex);
          this.total()
          this.nzMessageService.success(d['msg']);
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
    
  }

  total() {
    this.server.total(this.uid,'p').subscribe(d => {
      if(d !=null && d['code'] === '0000178') {
        this.totalNum = d['data'];
      }else{
        this.totalNum = 0;
      }
    });
  }

  changePage(num: Number){
    this.pageindex = num.toString();
   this.server.pullHomeProduct(this.uid,num.toString()).subscribe(d=>{
     
      if(d != null && d['code'] === '0000153'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000152'){
        this.owner = false;
      }
      if(d != null){
        this.productSet = d['data'];
      }else{
        this.productSet = null;
      }
    });
  }


  getProduct(uid:string,i = '1') {
    this.server.pullHomeProduct(uid,i).subscribe(d=>{
     
      if(d != null && d['code'] === '0000153'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000152'){
        this.owner = false;
      }
      if(d != null){
        this.productSet = d['data'];
      }else{
        this.productSet = null;
      }
    });
  }
}
