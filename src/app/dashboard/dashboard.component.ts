import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router, private appService: AppService) {
   }
   @ViewChild('number') number;


  options  = [
    'MAT',
    'ENG',
    'GEN',
    'ALL'
  ];
  olevelForm;
  selected;
  userData;
  waec_result;
  user_id;
  subjects;
  waec_sum;

  ngOnInit() {
    this.olevelForm = new FormGroup({
      maths: new FormControl(),
      english: new FormControl(),
      first_required: new FormControl(),
      second_required: new FormControl(),
      third_required:  new FormControl()
    });
    this.appService.getUserDetails().subscribe(
     data => {
        this.userData = data['user'];
        this.user_id = this.userData['id'];
        const result = JSON.parse(localStorage.getItem('waec_' + this.user_id));
        this.waec_result  = Object.values(result);
        this.subjects = Object.keys(result);
        this.waec_sum = this.calculateWaec(this.waec_result);
        console.log(this.waec_result);
      }
    );
    // console.log(this.calculateWaec(this.waec_results));
  }


  startQuiz(value) {
    $('#modal-fadein').modal('show');
    this.selected = value;
  }

  start() {
    console.log(this.number);
    const e = (document.getElementById('number')) as HTMLSelectElement;
    const sel = e.selectedIndex;
    const opt = e.options[sel];
    const number = Number(opt.text);
    const subject = this.options[this.selected];
    this.router.navigate(['test', subject, number]);
  }


  submitolevelForm(value) {
    // if (value.maths = '' ||
    //     value.english = '') {

    // }
    const user_id = this.userData['id'];
    localStorage.setItem('waec_' + user_id, JSON.stringify(value));
    console.log('Your WAEC result has been saved');
    this.waec_result = Object.values(value);
    this.subjects = Object.keys(value);
  }
  calculateWaec(value: any) {
    const new_array = [];
    for ( let i = 0; i < value.length; i ++) {
      new_array.push(Number(value[i]));
    }
    const sum = new_array.reduce(( a , b) => a + b, 0);
    return sum.toFixed();
  }
}
