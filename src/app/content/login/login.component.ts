import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../utility/login.service';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from '../../entity/user.entity';
import { SharedServerService } from '../../utility/shared-server.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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

    if(this.validateForm.valid){ //确保输入有效
      this.login.login( a.value, b.value ).subscribe(c => {
        if(c['code'] === '0000144' || c['code'] === '0000448') {
          this.message.create('success', c['msg']);
          this.user.emit(c['data']);
          this._sharedServer.emitChange('login'); //通知父页面
          this.router.navigate(['/recommed']);
        }else{
          this.message.create('error', c['msg']);
        }
      });
   }
    
  }


  constructor(
    private fb: FormBuilder,
    private login : LoginService,
    private message: NzMessageService,
    private _sharedServer: SharedServerService,
    private router: Router,
    private location: Location
    ){}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    
  }



}
