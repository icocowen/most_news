import { Injectable } from '@angular/core';
import { Md5} from "ts-md5";
import { getUser } from '../entity/user.entity';
import { SharedServerService } from './shared-server.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  psalt: string = ":><LKMJOIU5/';46"; //16
  constructor() { }

  // 两次md5+salt  salt 是向服务器请求的 保存在token中  服务器token密钥为 salt+随机数 保存在数据库中
  // salt加在token中
  /**
   * 应该返回一个json {code: '', msg: '' , data: ''}
   */
  login(username: string, password: string) : {"code", "msg","data"}{

    password = password.trim()+ this.psalt+ password.trim();
    let encrypt = Md5.hashStr(password) as string;
    
    password = encrypt.substr(12, 13) + this.psalt.substr(8, 4) +  encrypt.substr(0, 12) +  this.psalt.substring(0, 8)+ encrypt.substr(32, 2)  + this.psalt.substr(12, 4) + encrypt.substr(25, 5);
    
    // 123  ed32a06d060d7IU5/6f479151ed3e:><LKMJO';46bd10e

    if(username === '123' && password === "ed32a06d060d7IU5/6f479151ed3e:><LKMJO';46bd10e") {
      console.log('登录成功');
      return {"code": 1, "msg": '登录成功', "data" : getUser()};
    }else{
      console.log('登录失败');
      return {"code": 0, "msg": '登录失败', "data" : null};
    }
  }
}
