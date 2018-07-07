import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {FormControl, FormGroup} from '@angular/forms';
import { Helper } from '../Helpers';
declare var $;

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent implements OnInit {

  constructor(
    private helper: Helper
  ) { }

  aggregateForm;
  userData;
  user_id;
  waec_result;
  waec_sum;
  subjects;
  jambScore;

  ngOnInit() {
         this.userData = JSON.parse(localStorage.getItem('user'));
         this.user_id = this.userData['id'];
         this.jambScore = this.userData['jambScore'];
         const result = JSON.parse(localStorage.getItem('waec_' + this.user_id));
         if (result) {
          this.waec_result  = Object.values(result);
          this.subjects = Object.keys(result);
          this.waec_sum = this.helper.calculateWaec();
         }

    this.aggregateForm = new FormGroup({
      maths: new FormControl(),
      english: new FormControl(),
      first_required: new FormControl(),
      second_required: new FormControl(),
      third_required:  new FormControl(),
      jamb_score: new FormControl(this.jambScore),
      postutme_score: new FormControl()
    });

  }

  calculateAggregate(value) {
    console.log(value);
     // Check if POST UME and WAEC are Invalid
     if (value.jamb_score > 400 || value.jamb_score < 200 ) {
      this.error('Invalid Jamb Score');
      return;
    }
    if (value.postutme_score > 50) {
      this.error('Invalid Post UTME Score');
      return;
    }
    let aggregate;
    if (this.waec_result && this.jambScore) {
      console.log('has waec');
      if (value['postutme_score'] === null) {
        this.error('You didnt enter post ume score');
        return;
      }
      aggregate = (value['jamb_score'] / 8 + ((value['postutme_score'] / 50) * 30 ) + Number(this.waec_sum)).toFixed(2);
      $.notify('Your aggregate is ' + aggregate + '%');
      return;
    } else {
      const results = Object.values(value);
      for (let i = 0; i < results.length; i++) {
        if (results[i] === null) {
          this.error('Incomplete Credentials');
          return;
        }
      }
      const waec_results = results.slice(0, 5);
      const result =  waec_results.map(function (x) {
        return Number(x);
      });
      const sum = result.reduce(( a , b) => a + b, 0).toFixed();
      aggregate = (value['jamb_score'] / 8 + ((value['postutme_score'] / 50) * 30 ) + Number(sum)).toFixed(2);
      $.notify('Your aggregate is ' + aggregate + '%');
    }
  }

  error(value) {
    $.notify({message: value }, { type: 'danger'});
  }
}
