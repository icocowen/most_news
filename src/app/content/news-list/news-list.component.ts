import { Component, OnInit, HostListener, Input } from '@angular/core';
import { differenceInHours, distanceInWords } from 'date-fns';
import { NewsServerService } from '../../data/news-server.service';
import { fromEvent, from, of, interval } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { News } from '../../entity/news.entity';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotifyService } from '../../utility/notify.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  @Input() newType;
  targetType: string;
  public data: News[];
  public p : number;
  addnewEvent$;

  constructor(
    private newsServer: NewsServerService,
    private route: ActivatedRoute,
    private notify: NotifyService
  ) {
    this.p = 1;
    this.data = [];
   }

  ngOnInit() {
    this.notify.notify();
    let newsType$ = of(this.newType)
    newsType$.subscribe((d:string) => {
      if(d == 'recommed') {
        d = 'all';
      }
      if(d == 'search') {
        this.route.paramMap.subscribe(
          k => {
            this.newsServer.matchNewsByKey(k.get('key')).subscribe(d =>
              {
                if(d != null) {
                  this.data = d;
                }else{
                  this.data = [];
                }
                
                this.addnewEvent$.unsubscribe();
              }
              
            );
          }
        );
        
      }else{
        this.targetType = d;
        this.pullNews(d);
        this.p = 1;
      }
     
    });
    
    let event$ = fromEvent(window, 'scroll').pipe(debounceTime(600));
    this.addnewEvent$ = event$.subscribe(_ => {
      let scrollTop = document.documentElement.scrollTop;
      let pageH = document.body.offsetHeight;
      let clientH = document.body.clientHeight;
      if(scrollTop + clientH + 100 > pageH) {
        this.p += 1;
        this.pullNews(this.targetType);
      }
    })
  }

  pullNews(t){
      this.newsServer.getData(t,(String)(this.p)).subscribe(d => {
        if(d) {
          this.data = this.data.concat(d);  
        } 
      });
  }


  ngOnDestroy(): void {
    this.addnewEvent$.unsubscribe();
    
  }
}
