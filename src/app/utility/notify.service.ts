import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  notifiton: any;
  notifys: any;
  noids: any;
  constructor(private auth: LoginService){}

  private emitChangeSource = new Subject<any>();

  changeEmitted$ = this.emitChangeSource.asObservable();

  notify() {
    let res = {};
    this.auth.checkNotifyNum().subscribe(d => {
      // console.warn(d);
        if(d != null && d['code'] === '0000198') {
          this.notifiton = d['data'];
        }else{
          this.notifiton = 0;
        }
        // res['notifys'] = this.notifys;
        // res['notifyNum'] = this.notifiton;
        // this.emitChangeSource.next(res);
    });

    this.auth.pullNotifys().subscribe(d => {
      let noid = 0;
      if(d != null && d['code'] === '0000194') {
        this.notifys = d['data']['hints'];
        this.noids = d['data']['noids'];
      }else{
        this.notifys = [{'hints': {}}];
        this.noids = [];
      }
      res['notifyNum'] = this.notifiton;
      res['notifys'] = this.notifys;
      res['noids'] = this.noids;
      this.emitChangeSource.next(res);
  });
 
  }


}
