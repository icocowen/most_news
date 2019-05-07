import { Injectable, Inject } from '@angular/core';
import { Md5} from "ts-md5";
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/user.entity';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class LoginService { //   

  psalt: string; //16
  DOMAIN_API:string;
  
  constructor(
    private http: HttpClient,
    @Inject('DOMAIN_API') domainApi : string,
    private cookieService: CookieService,
  ) { 
    this.DOMAIN_API = domainApi;
  }

  // 两次md5+salt  salt 是向服务器请求的 保存在token中  服务器token密钥为 salt+随机数 保存在数据库中
  // salt加在token中
  /**
   * 应该返回一个json {code: '', msg: '' , data: ''}
   */
  login(username: string, password: string){
    password = this.encodePwd(password);

    let url = this.DOMAIN_API+'/auth/auth/login';

    return this.http.post(url, JSON.stringify({'username':username, 'password':password}), {"withCredentials": true}).pipe(map(d => {
      if(d['code'] === '0000144' || d['code'] === '0000448') {
        let data = d['data'];
        let u = new User();
        u.userId = data['u_id'];
        u.username = data['nick_name'];
        u.avatar = data['avator'];
        u.email = data['email'];
        u.motto = data['motto'];   
        d['data'] = u;
      }
      return d;
    }));
  }

  encodePwd(pwd: string){
    this.psalt = Md5.hashStr((Math.random()*1000).toString()) as string;
    let encrypt = Md5.hashStr(Md5.hashStr(pwd.trim()) as string) as string;

    return encrypt.substr(12, 13) + this.psalt.substr(8, 4) +  encrypt.substr(0, 12) +  this.psalt.substring(0, 8)+ encrypt.substr(30, 2)  + this.psalt.substr(12, 4) + encrypt.substr(25, 5);
  }


  checkStatus(){
    let url = this.DOMAIN_API+'/auth/auth/checkStatus';

    return this.http.get(url, {"withCredentials": true}).pipe(map(d => {

      if(d != null && d['code'] === '0000448') {
        let data = d['data'];
        let u = new User();
        u.userId = data['u_id'];
        u.username = data['nick_name'];
        u.avatar = data['avator'];
        u.email = data['email'];
        u.motto = data['motto'];   
        d['data'] = u;
      }

      return d;
    }));
  }

  enterHomePage(uid: string){
    let url = this.DOMAIN_API+'/auth/auth/pullUser';

    return this.http.post(url,{'uid':uid}, {"withCredentials": true}).pipe(map(d => {

      if(d != null && (d['code'] === '0000151' || d['code'] === '0000150')) {
        let data = d['data'];
        let u = new User();
        u.userId = data['u_id'];
        u.username = data['nick_name'];
        u.avatar = data['avator'];
        u.email = data['email'];
        u.motto = data['motto'];   
        d['data'] = u;
      }
      return d;
    }));
  }

  logout(){
    let url = this.DOMAIN_API+'/auth/auth/logout';
    return this.http.get(url, {"withCredentials": true});
  }


  register(u){
    let url = this.DOMAIN_API+'/auth/auth/register';
    u['password'] = this.encodePwd(u['password']);
    return this.http.post(url,u, {"withCredentials": true});
  }

  checkEmail(e: string){
    let url = this.DOMAIN_API+'/auth/auth/checkEmail';
    return this.http.post(url,JSON.stringify({'email': e}),{"withCredentials": true});
  }


  checkNotifyNum(){
    let url = this.DOMAIN_API+'/notify/notify/notifyNum';
    return this.http.get(url,{"withCredentials": true});
  }

  pullNotifys(){
    let url = this.DOMAIN_API+'/notify/notify/notifys';
    return this.http.get(url,{"withCredentials": true});
  }

  seen(noid: string){
    let url = this.DOMAIN_API+'/notify/notify/seen';
    return this.http.post(url,{'noid': noid}, {"withCredentials": true});
  }

}
