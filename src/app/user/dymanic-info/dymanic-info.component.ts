import { Component, OnInit, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-dymanic-info',
  templateUrl: './dymanic-info.component.html',
  styleUrls: ['./dymanic-info.component.css']
})
export class DymanicInfoComponent implements OnInit {
  test= true;
  demotext = "管道测试";
  constructor() { }

  ngOnInit() {
  }
  @Output("comeOut") come = new EventEmitter<{a: number, b:string}>();


  onClick(d: MouseEvent) {
    // console.warn(d.target);
    // this.come.emit({a:12, b: 'asas'});
    
  }
  a = true;
}
