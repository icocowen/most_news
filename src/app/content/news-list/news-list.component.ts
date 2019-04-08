import { Component, OnInit, HostListener } from '@angular/core';
import { differenceInHours, distanceInWords } from 'date-fns';
import { NewsServerService } from 'src/app/data/news-server.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public data: any[];

  constructor(
    private newsServer: NewsServerService
  ) { }

  ngOnInit() {
    this.newsServer.getData().subscribe(d => this.data = d);
    fromEvent(window, 'scroll').pipe(debounceTime(400)).subscribe(_ => {
      let scrollTop = document.documentElement.scrollTop;
      let pageH = document.body.offsetHeight;
      let clientH = document.body.clientHeight;
      if(scrollTop + clientH + 100 > pageH) {
        this.newsServer.getData().subscribe(d => {
          this.data = this.data.concat(d);  
        });
      }
    })
  }

}
