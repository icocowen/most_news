import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  
  public isShowCarousel = true;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.isShowCarousel = true;
      if(d.title != 'recommed' || d.title == null) {
        this.isShowCarousel = false;
      }
    })
  }

}
