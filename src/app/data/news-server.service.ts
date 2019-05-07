import { Injectable, Inject } from '@angular/core';
import { of, pipe, from, Observable } from 'rxjs';
import { filter, first, mapTo, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { News } from '../entity/news.entity';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from '../entity/user.entity';
import { NewsComment } from '../entity/comment.entity';

@Injectable()
export class NewsServerService {
  
  dataItem$: any;
  public data: News[];
  domainApi: string;

  
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    @Inject('DOMAIN_API') domainApi : string
  ) {
    this.data = [];
    this.domainApi = domainApi;
  }

  public getNewsItem(id: string) {
    let url = this.domainApi+'/news/news/pullnewsitem';
    return this.http.get(url,{params:{nid: id}})
    .pipe(map(_data => {
      if(_data != null && _data['code'] == '0000141'){
        let n = new News();
        let item = _data['data']['item'];
        let comm = _data['data']['comm'];
        n.id = item['n_id'];
        n.article = item['article'];

        let value = n.article.slice(0, 40);
          

        let e = value.indexOf('</p>');
        if(e != -1) {
          value = value.substring(0, e);
          let s = value.indexOf('<p>');
          value = value.substring(s+3, value.length);
        }
        value = value.replace('<br>','');
        n.desc = value;
        
        n.commentsNum = item['comment_num'];
        n.nickName = item['nike_name'];
        n.tag = item['t_name'];
        n.tagid = item['tag_id'];
        n.title = item['n_title'];
        n.motto = item['motto'];
        n.time = format(parseInt(item['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
        n.uid = item['u_id'];
        let comms = [];
        for (let i = 0; i < comm.length; i++) {
          comms.push(comm[i]);
        }
         
        return {'item':n, 'comms': comms};
      }else{
        this.message.error("新闻内容不见啊了呢！！");
        return null;
      }
    }))
  }

  public getData(t = 'all',p = '1') {
    let url = this.domainApi + '/news/news/pullnews';
    return this.http.get(url,
    {params:{"t":t,"p":p}}).pipe(map(_data => {
      if(_data != null && _data['code'] == "0000140") {
        let data : News[] = [];
        for (let j = 0; j < _data['data'].length; j++) {
          let n = new News();
          n.id = _data['data'][j]['n_id'];
          n.article = _data['data'][j]['article'];
          let value = n.article.slice(0, 40);
          

          let e = value.indexOf('</p>');
          if(e != -1) {
            value = value.substring(0, e);
            let s = value.indexOf('<p>');
            value = value.substring(s+3, value.length);
          }
          value = value.replace('<br>','');
          n.desc = value;
          n.commentsNum = _data['data'][j]['comment_num'];
          n.nickName = _data['data'][j]['nike_name'];
          n.tag = _data['data'][j]['t_name'];
          n.tagid = _data['data'][j]['tag_id'];
          n.title = _data['data'][j]['n_title'];
          n.time = format(parseInt(_data['data'][j]['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
          n.uid = _data['data'][j]['u_id'];
          data.push(n);
        }
        return data;
      }else{
        this.message.loading("新闻到底了呢！！");
        return null;
      }
    }));
  }


  public matchTitleKey(key: string){
    let url = this.domainApi + '/news/news/pullnewstitle';
    return this.http.get(url,{params: {'k': key}}).pipe(
      map(d => {
        if(d!=null && d['code'] == '0000142'){
          return d['data'];
        }
      })
    );
  }

  public matchNewsByKey(key: string){
    let url = this.domainApi + '/news/news/pullnewstitle';
    return this.http.get(url,{params: {'search': key}}).pipe(
      map(_data => {
        if(_data != null &&_data['code'] == '0000143'){
          let data : News[] = [];
          for (let j = 0; j < _data['data'].length; j++) {
            let n = new News();
            n.id = _data['data'][j]['n_id'];
            n.article = _data['data'][j]['article'];
            let value = n.article.slice(0, 40);
          

            let e = value.indexOf('</p>');
            if(e != -1) {
              value = value.substring(0, e);
              let s = value.indexOf('<p>');
              value = value.substring(s+3, value.length);
            }
            value = value.replace('<br>','');
            n.desc = value;
            n.commentsNum = _data['data'][j]['comment_num'];
            n.nickName = _data['data'][j]['nike_name'];
            n.tag = _data['data'][j]['t_name'];
            n.tagid = _data['data'][j]['tag_id'];
            n.title = _data['data'][j]['n_title'];
            n.time = format(parseInt(_data['data'][j]['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
            n.uid = _data['data'][j]['u_id'];
            data.push(n);
          }
          return data;
        }
      })
    );
  }

  public deleteItem(id: string) {
    for (let j = 0; j < this.data.length; j++) {
      if(this.data[j].id == id) {
        this.data.splice(j, 1);
        return true;
      };
    }
    return false;
  }
  
  public pullHomePavorite(uid :string, index = '1') { //pullUserFavorit
    let url = this.domainApi + '/user/user/pullUserFavorit';
    return this.http.get(
      url,{"withCredentials": true,params:{'u':uid,'i':index}}
    ).pipe(map(_data => {
      if(_data != null && _data['code'] != '0000157'){
        let data : News[] = [];
        for (let j = 0; j < _data['data'].length; j++) {
          let n = new News();
          n.id = _data['data'][j]['n_id'];
          n.commentsNum = _data['data'][j]['comment_num'];
          n.nickName = _data['data'][j]['nike_name'];
          n.tag = _data['data'][j]['t_name'];
          n.tagid = _data['data'][j]['t_id'];
          n.title = _data['data'][j]['n_title'];
          n.time = format(parseInt(_data['data'][j]['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
          n.uid = uid;
          n.favoriteDate = format(parseInt(_data['data'][j]['f_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
          data.push(n);
        }
        _data['data'] = data;
        return _data;
      }
    }));
  }


  public pullHomeSub(uid :string, i = '1') { //pullUserFavorit
    let url = this.domainApi + '/user/user/pullUserSub';
    return this.http.get(
      url,{"withCredentials": true,params:{'u':uid,'i':i}}
    ).pipe(map(_data => {
      if(_data != null && _data['code'] != '0000161'){
        let data = [];
        for (let j = 0; j < _data['data'].length; j++) {
          let n = [];
          n['t_u_id'] = _data['data'][j]['t_u_id'];
          n['s_date'] = format(parseInt(_data['data'][j]['s_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
          n['nick_name'] = _data['data'][j]['nick_name'];
          n['motto'] = _data['data'][j]['motto'];
          n['avator'] = _data['data'][j]['avator'];
          data.push(n);
        }
        _data['data'] = data;
        return _data;
      }
    }));
  }


  public pullHomeProduct(uid :string, index = '1') { 
    let url = this.domainApi + '/user/user/pullUserProduct';
    return this.http.get(
      url,{"withCredentials": true,params:{'u':uid, 'i': index}}
    ).pipe(map(_data => {
      if(_data != null && _data['code'] != '0000154'){
        let data : News[] = [];
        for (let j = 0; j < _data['data'].length; j++) {
          let n = new News();
          n.id = _data['data'][j]['n_id'];
          n.article = _data['data'][j]['article'];
          let value = n.article.slice(0, 40);
          

          let e = value.indexOf('</p>');
          if(e != -1) {
            value = value.substring(0, e);
            let s = value.indexOf('<p>');
            value = value.substring(s+3, value.length);
     
          }
          value = value.replace('<br>','');
          n.desc = value;
          n.commentsNum = _data['data'][j]['comment_num'];
          n.nickName = _data['data'][j]['nike_name'];
          n.tag = _data['data'][j]['t_name'];
          n.tagid = _data['data'][j]['tag_id'];
          n.title = _data['data'][j]['n_title'];
          n.time = format(parseInt(_data['data'][j]['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
          n.uid = _data['data'][j]['u_id'];
          data.push(n);
        }
        _data['data'] = data;
        return _data;
      }
    }));
  }

  delProduct(nid: string){
    let url = this.domainApi + '/user/user/delUserProduct';
    return this.http.get(
      url,{"withCredentials": true,params:{'n':nid}}
    );
  }

  delComment(nid: string){
    let url = this.domainApi + '/user/user/delComment';
    return this.http.get(
      url,{"withCredentials": true,params:{'n':nid}}
    );
  }

  delFvorite(nid: string){
    let url = this.domainApi + '/user/user/delUserFavorite';
    return this.http.get(
      url,{"withCredentials": true,params:{'n':nid}}
    );
  }


  cancelSub(tid: string){
    let url = this.domainApi + '/user/user/delUserSub';
    return this.http.get(
      url,{"withCredentials": true,params:{'tu':tid}}
    );
  }


  pullNewsItem(nid: string){
    let url = this.domainApi+'/user/user/pullUserProductItem';
    return this.http.get(url,{"withCredentials": true,params:{'n':nid}})
    .pipe(map(_data => {
      if(_data != null && _data['code'] == '0000165'){
        let n = new News();
        let item = _data['data'];
        n.id = item['n_id'];
        n.article = item['article'];
        let value = n.article.slice(0, 40);
          

          let e = value.indexOf('</p>');
          if(e != -1) {
            value = value.substring(0, e);
            let s = value.indexOf('<p>');
            value = value.substring(s+3, value.length);
          }
          value = value.replace('<br>','');
          n.desc = value;
        n.commentsNum = item['comment_num'];
        n.nickName = item['nike_name'];
        n.tag = item['t_name'];
        n.tagid = item['tag_id'];
        n.title = item['n_title'];
        n.motto = item['motto'];
        n.time = format(parseInt(item['n_date']) * 1000, 'YYYY-MM-DD HH:mm:ss');
        n.uid = item['u_id'];
        return n;
      }else{
        this.message.error(_data['msg']);
        return null;
      }
    }))
  }

  updateProduct(news: News) {
    news.article = (news.article).replace('<p>SafeValue must use [property]=binding:','');
    news.article = (news.article).replace('(see http://g.co/ng/security#xss)<p></p>','');
    let url = this.domainApi+'/user/user/updateProductItem';
    return this.http.post(
          url, 
          JSON.stringify({'n_title':news.title, 'article':news.article, 'tag': news.tag, 'n_id': news.id ,'tag_id': ''}),
          {"withCredentials": true}
     );

  }


  getSub(uid: string) {
    let url = this.domainApi+'/user/user/sub';
    return this.http.get(
          url, 
          {"withCredentials": true, params:{'u': uid}}
     );
  }
  
  getSubed(uid: string) {
    let url = this.domainApi+'/user/user/subed';
    return this.http.get(
          url, 
          {"withCredentials": true, params:{'u': uid}}
     );
  }


  releaseProduct(news: News) {
    let url = this.domainApi+'/user/user/releaseProduct';
    return this.http.post(
          url, 
          JSON.stringify({'title':news.title, 'article':news.article, 'tag': news.tag}),
          {"withCredentials": true}
     );

  }


  updateNote(note: string) {
    let url = this.domainApi+'/user/user/updateNote';
    return this.http.post(
          url, 
          JSON.stringify({'note':note}),
          {"withCredentials": true}
     );

  }

  pullUserNote(uid: string){
    let url = this.domainApi+'/user/user/pullUserNote';
    return this.http.get(
          url, 
          {"withCredentials": true, params:{'u': uid}}
     );
  }


  total(uid: string, type: string){
    let url = this.domainApi+'/user/user/total';
    return this.http.get(
          url, 
          {"withCredentials": true, params:{'u': uid, 't':type}}
     );
  }


  addSub(tuid: string) {
    let url = this.domainApi+'/user/user/addSub';
    return this.http.post(
          url, 
          JSON.stringify({'tuid':tuid}),
          {"withCredentials": true}
     );

  }


  checkHasSub(tuid: string) {
    let url = this.domainApi+'/user/user/checkIsSub';
    return this.http.post(
          url, 
          JSON.stringify({'tuid':tuid}),
          {"withCredentials": true}
     );

  }


  addFavorite(nid: string) {
    let url = this.domainApi+'/user/user/addFavorite';
    return this.http.post(
          url, 
          JSON.stringify({'nid':nid}),
          {"withCredentials": true}
     );

  }


  checkHasFavorite(nid: string) {
    let url = this.domainApi+'/user/user/checkIsFavorite';
    return this.http.post(
          url, 
          JSON.stringify({'nid':nid}),
          {"withCredentials": true}
     );

  }


  comment(nid: string, content: string) {
    let url = this.domainApi+'/user/user/comment';
    return this.http.post(
          url, 
          JSON.stringify({'nid':nid, 'content':content}),
          {"withCredentials": true}
     );

  }

  getComment(nid: string){
    let url = this.domainApi+'/news/news/getComment';
    return this.http.get(
          url, 
          {"withCredentials": true, params: {'nid':nid}}
     );
  }

}
