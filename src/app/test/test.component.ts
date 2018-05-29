import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  subject;
  number;

  questions = [
  ];

  ngOnInit() {


    for (let i = 1; i < 11; i++) {
      this.questions.push(i);
    }
    this.route.params.switchMap(
      (params: Params) => {
        this.subject = params['subject'];
        this.number = params['number'];
        if (typeof params['number'] !== 'undefined' &&
          params['number'] !== null) {
            console.log(this.subject, this.number);
            return this.subject;
          // return this.starterService.getPost(this.subject, this.number);
        }
      }
    ).subscribe(
      data => {
      }
      );
  }

}
