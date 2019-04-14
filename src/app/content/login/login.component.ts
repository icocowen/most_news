import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/utility/login.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from 'src/app/entity/user.entity';
import { SharedServerService } from 'src/app/utility/shared-server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  user  = new EventEmitter<User>();

  validateForm: FormGroup;

  submitForm(): void {
    let a = this.validateForm.get('userName');
    let b = this.validateForm.get('password');

    let c = this.login.login(a.value, b.value);
    if(c.code == 1) {
      this.message.create('success', '登录成功！');
      console.log(c);
      this.user.emit(c.data);
      this._sharedServer.emitChange('login'); //通知父页面
    }else if(c.code == 0){
      this.message.create('error', '登录失败！');
    }
  }


  constructor(
    private fb: FormBuilder,
    private login : LoginService,
    private message: NzMessageService,
    private _sharedServer: SharedServerService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    
  }



}
