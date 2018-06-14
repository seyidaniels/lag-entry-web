import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../app.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  waec_error;

  ngOnInit() {
    this.olevelForm = new FormGroup({
      maths: new FormControl(),
      english: new FormControl(),
      first_required: new FormControl(),
      second_required: new FormControl(),
      third_required:  new FormControl()
    });
        this.userData = JSON.parse(localStorage.getItem('user'));
        this.user_id = this.userData['id'];
        const result = JSON.parse(localStorage.getItem('waec_' + this.user_id));
        if (result) {
          this.waec_result  = Object.values(result);
          this.subjects = Object.keys(result);
          this.waec_sum = this.calculateWaec(this.waec_result);
        }
        // Store User Jamb Result
        localStorage.setItem('jamb_' + this.user_id, this.userData['jambScore']);
      }
    // console.log(this.calculateWaec(this.waec_results));


  startQuiz(value) {
    $('#modal-fadein').modal('show');
    this.selected = value;
  }

  start() {
    const e = (document.getElementById('number')) as HTMLSelectElement;
    const sel = e.selectedIndex;
    const opt = e.options[sel];
    const number = Number(opt.text);
    if (number === 0) {
      console.log('You have not chosen a value');
      $.notify({
        icon: 'fas fa-exclamation',
        message: 'You have not chosen a value.'
      }, {
        type: 'danger'
      });
      return;
    }
    const subject = this.options[this.selected];
    this.router.navigate(['test', subject, number]);
  }

  startAllQuiz() {
    const subject = 'all';
    const number = 30;
    this.router.navigate(['test', subject, number]);
  }


  submitolevelForm(value) {
    this.waec_error = undefined;
    if (
        value.maths === null ||
        value.english === null ||
        value.first_required === null ||
        value.second_required === null ||
        value.third_required  === null
      ) {
        this.waec_error = 'Incomplete WAEC Details';
        return;
    }
    const user_id = this.userData['id'];
    localStorage.setItem('waec_' + user_id, JSON.stringify(value));
    $.notify({
      icon: 'fas fa-paw',
      message: 'Your WAEC result has been saved.'
    }, {
      type: 'success'
    });
    this.waec_result = Object.values(value);
    this.subjects = Object.keys(value);
    this.waec_sum = this.calculateWaec(this.waec_result);
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
