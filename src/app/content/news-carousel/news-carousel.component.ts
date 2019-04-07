import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-carousel',
  templateUrl: './news-carousel.component.html',
  styleUrls: ['./news-carousel.component.css']
})
export class NewsCarouselComponent implements OnInit {

  array = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

}
