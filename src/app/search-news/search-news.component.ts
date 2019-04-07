import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.sass']
})
export class SearchNewsComponent implements OnInit {
  public items = ['iwee', 'ewqwe', 'weq']

  constructor() { }

  ngOnInit() {
  }

  mayKeyword(value: string) {
    
  }

}
