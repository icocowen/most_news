import { Component, OnInit } from '@angular/core';
import { differenceInHours, distanceInWords } from 'date-fns';
import { NewsServerService } from 'src/app/data/news-server.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  public data;

  constructor(
    private newsServer: NewsServerService
  ) { }

  ngOnInit() {
    this.newsServer.getData().subscribe(d => this.data = d);
  }

}
