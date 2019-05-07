import { Component, OnInit } from '@angular/core';
import { distanceInWords, addDays } from 'date-fns';
import { NewsServerService } from '../../data/news-server.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from '../../utility/login.service';
import { NewsComment } from '../../entity/comment.entity';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  public articleData;
  public commsData : any[];
  isLoading:boolean = false;
  subTip:string = '关注';
  btnType:string = 'primary';
  uid: string;
  isSub: boolean = false;
  starTheme: string = 'outline';//  
  isfavorite: boolean = false;
  nid: any;
  isCanComment: boolean = true;
  inputValue = '必须登录才能评论';
  username: any;
  cuid: any;
  submitting = false;

  constructor(
    private newsData: NewsServerService,
    private route : ActivatedRoute,
    private nzMessageService: NzMessageService,
    private auth: LoginService
  ){

  }


  
  ngOnInit(): void {
    this.commsData = [];
    this.route.paramMap.subscribe(d => {
      this.newsData.getNewsItem(d.get('id')).subscribe(di =>{
        this.articleData = di.item;
        this.uid = this.articleData.uid;
        this.nid = this.articleData.id;
        this.commsData = di.comms;
        this.checkHasSub();
        this.checkHasFavorite();
      });
    });
    

    this.auth.checkStatus().subscribe(u => {
      if(u) {
        this.cuid = u['data']['userId'];
        this.username = u['data']['username'];
        this.isCanComment = false;
        this.inputValue = '';
      }
    });
  }





  

 

  handleSubmit(): void {
    this.submitting = true;
    const content :string = this.inputValue;
    this.inputValue = '';

    if(content.trim()){
      this.newsData.comment(this.nid,content).subscribe(d => {
        if(d != null && d['code'] === '0000188' ) {
          this.getComment();
          this.nzMessageService.success(d['msg']);
        }else if(d != null ) {
          this.nzMessageService.error(d['msg']);
        }

        this.submitting = false;
      })
    }else{
      this.submitting = false;
      this.nzMessageService.warning("评论不能把为空！");

    }
    
  }

  delComment(){
    this.newsData.delComment(this.nid).subscribe(d => {
      if(d != null && d['code'] === '0000190'){
        this.getComment();
        this.nzMessageService.success(d['msg']);
        
      }else if(d != null && d['code'] === '0000449') {
        this.nzMessageService.warning(d['msg']);
      }else{
        this.nzMessageService.error(d['msg']);
      }
    });
  }

  getComment() {
    this.newsData.getComment(this.nid).subscribe(d => {
      if(d != null && d['code'] === '0000192'){
        this.commsData = d['data'];
      }else{
        this.commsData = [];
      }
    });
  }

  favorite(nid : string){
    if(this.isfavorite) {
      this.delFavorite(nid);
    }else{
      this.newsData.addFavorite(nid).subscribe(d => {
        if(d!=null && d['code'] === '0000184') {
            this.nzMessageService.success(d['msg']);
            this.starTheme = 'twotone';
            this.isfavorite = true;
        }else if(d != null ){
            this.nzMessageService.error(d['msg']);
        }
        
      });
    }
  }

  checkHasFavorite(){
    this.newsData.checkHasFavorite(this.nid).subscribe(d => {
      if(d!=null && d['code'] === '0000186') {
          this.starTheme = 'twotone';
          this.isfavorite = true;
      }
    });
  }


  delFavorite(nid: string){
    this.newsData.delFvorite(nid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000163'){
          this.nzMessageService.success(d['msg']);
          this.starTheme = 'outline';
          this.isfavorite = false;
        }else if(d != null){
          this.nzMessageService.error(d['msg']);
        }
      }
    );
  }

  addSub(tuid:string) {
    if(this.isSub) {
      this.cancelSub(tuid);
    }else{
      this.isLoading = true;
          this.newsData.addSub(tuid).subscribe(d => {
            if(d!=null && d['code'] === '0000180') {
                this.nzMessageService.success(d['msg']);
                this.subTip = '已关注';
                this.btnType = 'default';
                this.isSub = true;
            }else if(d != null ){
                this.nzMessageService.error(d['msg']);
            }
            this.isLoading = false;
          });
    }
    
  }

  cancelSub(tid: string){
    this.isLoading = true;
    this.newsData.cancelSub(tid).subscribe(
      d => {
        if(d!=null && d['code'] === '0000164'){
          this.nzMessageService.success('取消关注成功');
          this.subTip = '关注';
          this.btnType = 'primary';
          this.isSub = false;
          
        }else if(d != null){
          this.nzMessageService.error('取消关注失败');
        }

       this.isLoading = false;

      }
    );
  }


  checkHasSub(){
    this.isLoading = true;
    this.newsData.checkHasSub(this.uid).subscribe(d => {
      if(d!=null && d['code'] === '0000182') {
          this.subTip = '已关注';
          this.btnType = 'default';
          this.isSub = true;
      }
      this.isLoading = false;
    });
  }
}