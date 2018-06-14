import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {FormControl, FormGroup} from '@angular/forms';
declare var $;

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent implements OnInit {

  constructor(
    private appService: AppService
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
          this.waec_sum = this.calculateWaec(this.waec_result);
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
    let aggregate;
    if (this.waec_result) {
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
      // Check if POST UME and WAEC are Invalid
      if (value.jamb_score > 400 || value.jamb_score < 200 ) {
        this.error('Invalid Jamb Score');
        return;
      }
      if (value.postutme_score > 50) {
        this.error('Invalid Post UTME Score');
        return;
      }
      const waec_results = results.slice(0, 5);
      const waec_sum = this.calculateWaec(waec_results);
      aggregate = (value['jamb_score'] / 8 + ((value['postutme_score'] / 50) * 30 ) + Number(waec_sum)).toFixed(2);
      $.notify('Your aggregate is ' + aggregate + '%');
      console.log(aggregate);
    }
  }


  calculateWaec(value: any) {
    const new_array = [];
    for ( let i = 0; i < value.length; i ++) {
      new_array.push(Number(value[i]));
    }
    const sum = new_array.reduce(( a , b) => a + b, 0);
    return sum.toFixed();
  }

  error(value) {
    $.notify({message: value }, { type: 'danger'});
  }


}
