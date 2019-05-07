import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { User } from '../../entity/user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsServerService } from '../../data/news-server.service';
import { NzMessageService } from 'ng-zorro-antd';
import { SharedServerService } from '../../utility/shared-server.service';
import { NotifyService } from '../../utility/notify.service';

@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnInit {

  public user : User;
  public userBg ;
  productSet;
  isShowMore: boolean;

  collectSet;
  subscribeSet: any;
  owner: boolean = true;
  uid: string;
  subNum: any = 0;
  subedNum: any = 0;
  note: any;
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private server :NewsServerService,
    private nzMessageService: NzMessageService,
    private router: Router,
    private notify: NotifyService
  ) { 
    
  }

  ngOnInit() {
    

    this.notify.notify();
    this.activatedRoute.parent.url.subscribe(p => {
      this.uid = p[1].path;
    });
    this.getProduct(this.uid);
    this.getFavorite(this.uid);
    this.getSub(this.uid);
    this.getSubNum(this.uid);
    this.getSubedNum(this.uid);
    this.pullNote(this.uid);
    
  }
  
  getSub(uid:string) {
    this.server.pullHomeSub(uid).subscribe(d=>{
      if(d!=null) {
        this.subscribeSet = d['data'].slice(0,4);
      }else{
        this.subscribeSet = null;
      }
    });
  }

  getFavorite(uid:string) {
    this.server.pullHomePavorite(uid).subscribe(d=>{
      if(d!=null) {
        this.collectSet = d['data'].slice(0,5);
      }else{
        this.collectSet = null;
      }
    });
  }
  
  getProduct(uid:string) {
    this.server.pullHomeProduct(uid).subscribe(d=>{
     
      if(d != null && d['code'] === '0000153'){ //owner
        this.owner = true;
      }else if(d != null && d['code'] === '0000152'){
        this.owner = false;
      }
      if(d != null){
        this.productSet = d['data'].slice(0,5);
      }else{
        this.productSet = null;
      }

      
    });
  }




  confirm(id: string): void {
    this.server.delProduct(id).subscribe(
      d => {
        if(d!=null && d['code'] === '0000162'){
          this.getProduct(this.uid);
          this.nzMessageService.success(d['msg']);
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
    
  }

  getSubNum(uid : string){
    this.server.getSub(this.uid).subscribe(d => {
      if(d != null && d['code'] === '0000168') {
        this.subNum = d['data'];
      }else{
        this.subNum = 0;
      }
    });
  }

  getSubedNum(uid : string){
    this.server.getSubed(uid).subscribe(d => {
      if(d != null && d['code'] === '0000170') {
        this.subedNum = d['data'];
      }else{
        this.subedNum = 0;
      }
    });
  }


  delFavorite(nid: string){
    this.server.delFvorite(nid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000163'){
          this.getFavorite(this.uid);
          this.nzMessageService.success(d['msg']);
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
  }

  cancelSub(tid: string){
    this.server.cancelSub(tid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000164'){
          this.getSub(this.uid);
          this.getSubNum(this.uid);
          this.nzMessageService.success(d['msg']);
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
  }

  editorConfirm(uid:string){
    this.router.navigate(['../../release', uid]);
  }

  updateNote(note: string){
    if(this.owner) {
      this.server.updateNote(note).subscribe(_ => {});
    }
  }

  pullNote(uid: string){
    this.server.pullUserNote(uid).subscribe(
      d => {
        if(d!=null) {
          this.note = d['data'];
        }else{
          this.note = null;
        }
      }
    );
  }



}
