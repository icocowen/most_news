import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NewsServerService } from '../data/news-server.service';
import { of, fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchNewsComponent implements OnInit {
  public items: string[];


  @ViewChild('input') input_text;
  keyValue:string;


  constructor(
    private newsServer: NewsServerService,
    private router: Router
  ) {
  }

  ngOnInit() {
    fromEvent(this.input_text.nativeElement, 'keyup').pipe(debounceTime(300)).subscribe((e:KeyboardEvent) => {
        if(e.keyCode != 13){//enter
          this.newsServer.matchTitleKey(this.keyValue).subscribe(d => this.items = d);
        }else{//begin serach
          this.search();
        }
      }
    );
  }


  selected(){
    this.search();
  }

  search(){
    this.router.navigate(['search', this.keyValue]);     
  }
}
