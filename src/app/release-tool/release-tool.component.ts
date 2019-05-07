import { Component, OnInit } from '@angular/core';
import * as wangEditor from 'wangeditor'
import { ActivatedRoute, Router } from '@angular/router';
import { NewsServerService } from '../data/news-server.service';
import { News } from '../entity/news.entity';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { idText } from 'typescript';

@Component({
  selector: 'app-release-tool',
  templateUrl: './release-tool.component.html',
  styleUrls: ['./release-tool.component.css']
})
export class ReleaseToolComponent implements OnInit {
  editor: any;
  news:News;
  tagValue: string;
  productId: string;
  mode: any;

  constructor(
    private activateRouted: ActivatedRoute,
    private newsService: NewsServerService,
    private message: NzMessageService,
    private loca: Location,
    private domSanitizer :DomSanitizer 
  ) { }

  ngOnInit() {
   this.editor =  new wangEditor('#editor');
   this.editor.create();
   this.editor.txt.text('输入新闻正文内容');
   this.activateRouted.data.subscribe(d => {
     if(d.target === 'release'){
      this.tRelease();
     }else if(d.target === 'publish') {
       
     }
     this.mode = d.target;
   });

  }





  tRelease(){
    this.productId = this.activateRouted.snapshot.paramMap.get('id');
    this.newsService.pullNewsItem(this.productId).subscribe( d=> {
 
      if(d != null) {
         this.news = d;
         // this.content = this.news.article;
         //昨晚做到这里
         this.editor.txt.text(this.domSanitizer.bypassSecurityTrustHtml(this.news.article));
         for (let i = 0; i < this.checkOptionsOne.length; i++) {
           if(this.checkOptionsOne[i].value == this.news.tag) {
             this.tagValue = this.news.tag;
           }
           
         }
      }
    });
  }


  checkOptionsOne = [
    { label: '科技', value: '科技'},
    { label: '娱乐', value: '娱乐' },
    { label: '游戏', value: '游戏' },
    { label: '体育', value: '体育' },
    { label: '财经', value: '财经' },
    { label: '搞笑', value: '搞笑' }
  ];

  release(title: string){
    let news = new News();
    news.tag = this.tagValue;
    news.title = title;
    news.article = this.editor.txt.html().replace('<p _ngcontent-c9="">', '');
    
 
    if(this.mode === 'release') {
      news.id = this.news.id;
      this.newsService.updateProduct(news).subscribe(d => {
        if(d != null && d['code'] === '0000167') {//update succ
          this.message.success(d['msg']);
          this.loca.back();
        }else if(d != null){ //fail
          this.message.error(d['msg']);
        }else{
          this.message.error('更新失败');
        }
      });

    }else if(this.mode === 'publish') {
      this.newsService.releaseProduct(news).subscribe(d => {
        if(d != null && d['code'] === '0000172') {//update succ
          this.message.success(d['msg']);
          this.loca.back();
        }else if(d != null){ //fail
          this.message.error(d['msg']);
        }else{
          this.message.error('发布失败');
        }
      });

    }
    
    
  }

}
