import { Component, OnInit } from '@angular/core';
import { distanceInWords, addDays } from 'date-fns';
import { NewsServerService } from 'src/app/data/news-server.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {

  public articleData;
  constructor(
    private newsData: NewsServerService,
    private route : ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(d => this.articleData = this.newsData.getNewsItem(d.get('id')));
  }
  article = {type: '国际'}
  data: any[] = [];
  submitting = false;
  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: distanceInWords(new Date(), new Date())
        }
      ].map(e => {
        return {
          ...e,
          displayTime: distanceInWords(new Date(), e.datetime)
        };
      });
    }, 800);
  }
}