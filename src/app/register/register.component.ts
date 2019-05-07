import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { LoginService } from '../utility/login.service';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {



  validateForm: FormGroup;

  submitForm(): void {
    if(this.validateForm.valid) {
      this.auth.register(this.validateForm.value).subscribe(d => {
        if(d!=null && d['code'] === '0000148') {
          this.modal.info({
          nzTitle: d['msg']+' 请记住账号',
          nzContent: '您的账号为: '+d['data']+' 密码为: ' + this.validateForm.get('password').value,
          nzOkText: '我记住了',
          nzCancelText: null
        });
        }
      });
    }
  }

  checkEmail(){
    if(this.validateForm.get('email').valid) {
      this.auth.checkEmail(this.validateForm.get('email').value).subscribe(d => {
        if(d != null && d['code'] === '0000451') {
          this.validateForm.get('email').setValue('');
        }
      });
    }
    
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private auth: LoginService,
    private modal: NzModalService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]]
    });
  }
}


