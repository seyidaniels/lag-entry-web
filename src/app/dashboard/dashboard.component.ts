import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validation } from '../Validation';
import { Helper } from '../Helpers';
import { AppService } from '../app.service';

declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router: Router, private validate: Validation, private helper: Helper, ) {
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
  data;

  ngOnInit() {
        this.loadWaecForm();
        this.userData = JSON.parse(localStorage.getItem('user'));
        this.user_id = this.userData.id;
        const result = JSON.parse(localStorage.getItem('waec_' + this.user_id));
        if (result) {
          this.waec_result  = Object.values(result);
          this.subjects = Object.keys(result);
          this.waec_sum = this.helper.calculateWaec();
        }
        // Store User Jamb Result
        localStorage.setItem('jamb_' + this.user_id, this.userData['jambScore']);
        // Show Analytics
        if (localStorage.getItem('data') === 'false') {
            console.log('No results yet');
            this.data = false;
        } else {
          this.data = true;
        }
      }

      loadWaecForm () {
        this.olevelForm = new FormGroup({
          maths: new FormControl(),
          english: new FormControl(),
          first_required: new FormControl(),
          second_required: new FormControl(),
          third_required:  new FormControl()
        });
      }
  startQuiz(value) {
    $('#modal-fadein').modal();
    this.selected = value;
  }

  start() {
    const e = (document.getElementById('number')) as HTMLSelectElement;
    const sel = e.selectedIndex;
    const opt = e.options[sel];
    const number = Number(opt.text);
    if (number === 0) {
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
    if (!this.validate.validate(value)) {
        this.waec_error = 'Incomplete WAEC Details';
        return;
    }
    const user_id = this.userData['id'];
    localStorage.setItem('waec_' + user_id, JSON.stringify(value));
    this.helper.successNotify( $, 'Waec result saved');
    this.subjects = Object.keys(value);
    this.waec_sum = this.helper.calculateWaec();
  }
}
