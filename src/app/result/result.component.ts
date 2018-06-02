import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  results = {

  };
  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.results = this.appService.getResults();
    console.log(this.results);
  }



}
